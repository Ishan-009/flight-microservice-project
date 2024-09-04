const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
const { FlightMiddleware } = require("../middleware");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries.js");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          as: "airplane_details",

          requried: true,
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",

          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },

          include: {
            model: City,
            required: true,
          },
        },

        {
          model: Airport,
          required: true,
          as: "arrivalAirport",

          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },

          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    // IMP Notes
    // here we have to put alias in both model and repository in order to use alias , also here we have to mention the col name in which we have to apply inner join on whihc is code here by default it will take airport It so ussing sequelize library we are using col method to specify the query to use arrival adn departure airprot id to code as we are storing code in these both fields

    // here we are using alias as refernce to implement things or access things like "Flight.arrivalAirportId" here "Flight " is an alias same goes for "arrivalAirport" and "departureAirport", it requires so it could figure out on which association it want to impolement operation as "Airport.code" could be use multiple times as it could figure on which column it want to apply implementation

    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();

    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));
      // THIS QUERY IS GONAA PUT ROW LOCK FOR ANY UPDATE WE ARE GONNA DO, PESSIMISTIC CONCURRENCY CONTROL

      const flight = await Flight.findByPk(flightId);

      if (+dec) {
        //shorthand for number(dec)
        console.log(flight);
        await flight.decrement(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
      } else {
        await flight.increment(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
        //  so whenever this queries will be executed it will execute in one transaction so by passing object as an new argument
      }
      await transaction.commit;
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
