const axios = require("axios");

const { BookingRepository } = require("../repositories/index");
const { ServerConfig, Queue } = require("../config/index");
const db = require("../models");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
const bookingRepository = new BookingRepository();
async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data.data;
    console.log(data.noOfSeats);
    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;
    console.log(totalBillingAmount);
    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    const booking = await bookingRepository.createBooking(
      bookingPayload,
      transaction
    );

    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}api/v1/flights/${data.flightId}/seats`,
      { seats: data.noOfSeats }
    );
    await transaction.commit();

    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(data.bookingId);

    if (bookingDetails.status == CANCELLED) {
      throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
    }
    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();
    const differenceTime = currentTime - bookingTime;
    console.log(differenceTime);
    // if difference between booking time and current time is more than 5 minutes means we want to expire the booking and cancel the booking
    if (differenceTime > 300000) {
      cancelBooking(data.bookingId);

      await bookingRepository.update(
        data.bookingId,
        { status: CANCELLED },
        transaction
      );
      throw new AppError("The booking has expired", StatusCodes.BAD_REQUEST);
    }

    if (bookingDetails.totalCost != data.totalCost) {
      throw new AppError(
        "Amount Doesnt match with the booking",
        StatusCodes.BAD_REQUEST
      );
    }

    if (bookingDetails.userId != data.userId) {
      throw new AppError(
        "The user corresponding to the booking does not match",
        StatusCodes.BAD_REQUEST
      );
    }

    await bookingRepository.update(
      data.bookingId,
      { status: BOOKED },
      transaction
    );
    Queue.sendData({
      recepientEmail: "ishanmoorjmalani009@gmail.com",
      subject: "Flight Booked",
      text: `Booking Successfully done for the flight, ${data.bookingId}`,
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

// if we initiale or say call cancelbooking function to cancel the booking and update seats by increasing the seat by reverting it back to normal seat before booking by this the cancelbooking transaction will commit and makepayment transaction will rollback as we will expire the bookin and throw error booking expired and therefore transaction will rollback.

async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(bookingId);
    if (bookingDetails.status == CANCELLED) {
      await transaction.commit();
      return true;
    }
    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}api/v1/flights/${bookingDetails.flightId}/seats`,
      { seats: bookingDetails.noOfSeats, dec: 0 } //dec:false as 0 acts as falsy value
    );

    await bookingRepository.update(
      bookingId,
      { status: CANCELLED },
      transaction
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelOldBookings() {
  try {
    console.log("inside service");
    const time = new Date(Date.now() - 1000 * 300);
    // getting 5 minutes ago time from current time in order to detect/check the bookings timestamp if they are greater than 5 minutes we will cancel time by runingn cron job on them.
    const response = bookingRepository.cancelBooking(time);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createBooking,
  makePayment,
  cancelOldBookings,
};
