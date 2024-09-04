const CrudRepository = require("./crud-repository");
const { User } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      return user;
    } catch (error) {
      // Log the error for debugging
      console.error(`Error in UserRepository getUserByEmail: ${error.message}`);
      ``;

      // Rethrow the error or handle it appropriately
      throw new Error("Error retrieving user by email");
    }
  }
}

module.exports = UserRepository;
