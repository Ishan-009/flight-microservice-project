const CrudRepository = require("./crud-repository");
const { Role } = require("../models");

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }

  async getRoleByName(name) {
    try {
      const role = await Role.findOne({ where: { name: name } });
      return role;
    } catch (error) {
      // Log the error for debugging
      console.error(`Error in UserRepository getUserByEmail: ${error.message}`);
      ``;

      // Rethrow the error or handle it appropriately
      throw new Error("Error retrieving user by email");
    }
  }
}

module.exports = RoleRepository;
