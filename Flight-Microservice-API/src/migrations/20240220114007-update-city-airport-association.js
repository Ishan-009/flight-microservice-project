"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Airports", {
      fields: ["cityId"],
      type: "foreign key",
      name: "Airports_cityId_Cities_id_fk",
      references: {
        table: "Cities",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // Specify the desired onDelete action (CASCADE, SET NULL, etc.)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Airports",
      "Airports_cityId_Cities_id_fk"
    );
  },
};
