const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common/index");
const inMemDB = {};
async function createBooking(req, res) {
  try {
    const response = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
      dec: req.body.dec,
    });
    SuccessResponse.message = "Successfully Created an Flight Booking";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
// For now, we have implemented idempotency or say idempotent api using idempotent key by storing it in in memory database for implementing now, we can use cache or store this in db and retrieve values and further in that we can remove those idempontetn keys after few days using cron job so we can reuse all keys , we can uuid or hashing to generate idempotent key, or we can make certain regex/hasihing that has to followed from that we can easily differentiate from irrelevant idempotent key.

// also one more thing what if user changes idempotent key and resend request for that we can generate idempotent api based on certain secret key for which only server side knows how key is generated , by implementing such checks we can sustain idempotency in our api, apart from that we should always implement other checks if user process has been done or not within database in some scenarios and at deeper level theer could be such more checks.

async function makePayment(req, res) {
  try {
    const idempotentKey = req.headers["x-idempotent-key"];
    if (!idempotentKey) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Idempotent Key is not available", success: false });
    }

    if (inMemDB[idempotentKey]) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Cannot retry on successful payment",
        success: false,
      });
    }

    const response = await BookingService.makePayment({
      userId: req.body.userId,
      totalCost: req.body.totalCost,
      bookingId: req.body.bookingId,
    });
    inMemDB[idempotentKey] = idempotentKey;
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    console.log(ErrorResponse);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = { createBooking, makePayment };
