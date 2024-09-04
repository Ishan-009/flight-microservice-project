const { StatusCodes } = require("http-status-codes");

const { Ticket } = require("../models/index");
const CrudRepository = require("./crud-repository");
const { Op } = require("sequelize");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
class TicketRepository extends CrudRepository {
  constructor() {
    super(Ticket);
  }

  async getPendingTickets() {
    const response = await Ticket.findAll({ where: { status: "PENDING" } });
    return response;
  }
}

module.exports = TicketRepository;
