const logger = require("../helpers/winston.js");

class CartDAO {
  async addCartDb(productsArray) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewAllCartDb() {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewByIdCartDb(_id) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deleteCartDb(_id) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updateCartDb(_id, data) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = CartDAO;
