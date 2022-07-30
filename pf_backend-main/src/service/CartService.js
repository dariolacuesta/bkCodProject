const CartMongo = require("../db_persistence/CartMongo.js");
const cartDb = new CartMongo();
const logger = require("../helpers/winston.js");
const mailing = require("../helpers/nodemailer.js");

class CartService {
  async addCartService(productsArray) {
    try {
      const data = await { ...productsArray };
      const newProducto = await cartDb.addCartDb(data);
      if (newProducto == false) {
        return false;
      } else {
        const email = data.email;
        const subject = "Nuevo Pedido de Compra";
        const html = `<p>El usuario ${data.email} a realizado un compra.
                      Id de la compra ${newProducto._id}.</p>`;
        await mailing(email, subject, html);

        return newProducto;
      }
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewAllCartService() {
    try {
      const productos = await cartDb.viewAllCartDb();
      if (productos == false) return false;
      return productos;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewByIdCartService(_id) {
    try {
      const prodById = await cartDb.viewByIdCartDb(_id);
      if (prodById == false) return false;
      return prodById;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deleteCartService(_id) {
    try {
      const prodToDel = await cartDb.deleteCartDb(_id);
      if (prodToDel == false) return false;
      return prodToDel;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updateCartService(_id, data) {
    try {
      const prodUpdated = await cartDb.updateCartDb(
        _id,
        data
      );
      return prodUpdated;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = CartService;
