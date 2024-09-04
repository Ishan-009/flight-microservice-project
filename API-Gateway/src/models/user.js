"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: "User_Roles", as: "role" });
    }

    async beforeCreate() {}
  }
  User.init(
    {
      username: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: { type: DataTypes.STRING, validate: { len: [5, 13] } },
    },

    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    // Hash the password before saving the user
    const saltRounds = 10; // Adjust salt rounds as needed
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
  });

  return User;
};
