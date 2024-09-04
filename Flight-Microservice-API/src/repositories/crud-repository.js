const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config/index");
const AppError = require("../utils/errors/app-error");
class CrudRepository {
  constructor(model) {
    console.log("CrudRepository constructor", model);
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async delete(id) {
    const response = await this.model.destroy({
      where: {
        id: id,
      },
    });
    return response;
  }

  async get(id) {
    const response = await this.model.findByPk(id);
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    console.log("Update Method - ID:", id);
    console.log("Update Method - Data:", data);
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    console.log(response[0]);
    if (response[0] === 0) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async destroy(id) {
    const response = await this.model.destroy({
      where: {
        id: id,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}

module.exports = CrudRepository;
