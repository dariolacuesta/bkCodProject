const logger = require("../helpers/winston.js");

class OrderDAO {
  async addOrderDb(userId, status, cartId) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewAllOrderDb() {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewByIdOrderDb(_id) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deleteOrderDb(_id) {
    try {
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = OrderDAO;
