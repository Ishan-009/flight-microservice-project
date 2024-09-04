const { StatusCodes } = require("http-status-codes");

const { Booking } = require("../models/index");
const CrudRepository = require("./crud-repository");
const { Op } = require("sequelize");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  // Here wer are using custom create booking method here we want to pass transaction object into our method so that we can ensure that all queries or say process happens in within one transaction, so here we brought transaction object from service to repo so we can specify thsi create mehtod that we want to initiate this query within the transaction otherwise rollback
  async createBooking(data, transaction) {
    const response = await Booking.create(data, { transaction: transaction });
    return response;
  }

  //overriding get function so we can pass transaction object in to the method thatswhy

  async get(id, transaction) {
    const response = await this.model.findByPk(id, {
      transaction: transaction,
    });

    if (!response) {
      throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
    }

    return response;
  }

  async update(id, data, transaction) {
    const response = await this.model.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );

    if (!response) {
      throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
    }
    return response;
  }

  async cancelBooking(timestamp) {
    const response = await Booking.update(
      { status: CANCELLED },
      {
        where: {
          [Op.and]: [
            {
              createdAt: {
                [Op.lt]: timestamp,
              },
              // createdAt should be less than timestamp, its typical logic
              // createdAt= 11:20, suppose on 11:30 this cron job is running this function, then timestamp = currentTime - 5 mins,  so now createdAt < timestamp if true then query will be executed, 11:20<11:25 which means 5 mins has been passed from initial created booking time so thats why we need to update the status of booking to cancelled state as user fail to make payment within 5 minutes as per our requirement
            },

            {
              status: {
                [Op.ne]: BOOKED,
              },

              status: {
                [Op.ne]: CANCELLED,
              },
            },
          ],
        },
      }
    );
    // this above query will update status of those booking whose status is not booked/cancelled and its timestamp is greater than 5 minutes means booking was beign done 5 mins ago for these records we will run cron job and update these booking to cancelled state

    // and in canelled case if booking is cancelled we dont want to do query, so it will not do anything do table

    return response;
  }
}

module.exports = BookingRepository;
