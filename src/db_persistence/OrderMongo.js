const OrderDAO = require("../DAO/OrderDAO.js");
const OrderModel = require("../models/orderSchema.js");
const UserModel = require("../models/userSchema.js");
const CartModel = require("../models/cartSchema.js");

class OrderMongo extends OrderDAO {
  async addOrderDb(userId, status, cartId) {
    try {
      const buyer = await UserModel.findOne(
        { _id: userId },
        { password: 0, createdAt: 0, updatedAt: 0 }
      );
      const items = await CartModel.findOne(
        { _id: cartId },
        { createdAt: 0, updatedAt: 0, email: 0 }
      );
      const newOrder = await OrderModel.create({ buyer, status, items });
      if (!newOrder) return false;
      return newOrder;
    } catch (error) {}
  }

  async viewAllOrderDb() {
    try {
      const orders = await OrderModel.find({});
      if (!orders) return false;
      return orders;
    } catch (error) {}
  }

  async viewByIdOrderDb(_id) {
    try {
      const orderById = await OrderModel.findOne({ _id });
      if (!orderById) return false;
      return orderById;
    } catch (error) {}
  }

  async deleteOrderDb(_id) {
    try {
      console.log(_id);

      const orderToDel = await OrderModel.findByIdAndDelete({ _id });
      if (!orderToDel) return false;
      return orderToDel;
    } catch (error) {}
  }
}

module.exports = OrderMongo;
