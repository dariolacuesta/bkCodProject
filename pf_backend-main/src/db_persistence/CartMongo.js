const CartDAO = require("../DAO/CartDAO.js");
const CartModel = require("../models/cartSchema.js");

class CartMongo extends CartDAO {
  async addCartDb(productsArray) {
    try {
      const newProducto = await CartModel.create(productsArray);
      if (!newProducto) return false;
      return newProducto;
    } catch (error) {}
  }

  async viewAllCartDb() {
    try {
      const productos = await CartModel.find({});
      if (!productos) return false;
      return productos;
    } catch (error) {}
  }

  async viewByIdCartDb(_id) {
    try {
      const prodById = await CartModel.findOne({ _id });
      if (!prodById) return false;
      return prodById;
    } catch (error) {}
  }

  async deleteCartDb(_id) {
    try {
    console.log(_id)

      const prodToDel = await CartModel.findByIdAndDelete({ _id });
      if (!prodToDel) return false;
      return prodToDel;
    } catch (error) {}
  }

  async updateCartDb(_id, data) {
    try {
      const cartUpdated = await CartModel.updateOne({ _id }, data, {
        new: true,
      });
      return cartUpdated;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = CartMongo;
