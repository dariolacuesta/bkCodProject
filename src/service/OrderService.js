const OrderMongo = require("../db_persistence/OrderMongo.js");
const orderDb = new OrderMongo();
const logger = require("../helpers/winston.js");
const mailing = require("../helpers/nodemailer.js");

class OrderService {
  async addOrderService(userId, status, cartId) {
    try {
      const newOrder = await orderDb.addOrderDb(userId, status, cartId);
      if (newOrder == false) {
        return false;
      }

      console.log("Soy != de vacio", newOrder);
      const email = data.email;
      const subject = "Orden de Compra COMPLETADA";
      const html = `<p>El usuario ${data.email} a realizado la compra.
                      Id de la compra ${newOrder._id}.</p>`;

      await mailing(email, subject, html);

      return newOrder;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewAllOrderService() {
    try {
      const ordenes = await orderDb.viewAllOrderDb();
      if (ordenes == false) return false;
      return ordenes;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewByIdOrderService(_id) {
    try {
      const orderById = await orderDb.viewByIdOrderDb(_id);
      if (orderById == false) return false;
      return orderById;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deleteOrderService(_id) {
    try {
      const orderToDel = await orderDb.deleteOrderDb(_id);
      if (orderToDel == false) return false;
      return orderToDel;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = OrderService;
