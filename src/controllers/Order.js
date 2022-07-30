const OrderService = require("../service/OrderService.js");
const order = new OrderService();
const logger = require("../helpers/winston.js");

class OrderController {
  addOrder = async (req, res) => {
    try {
      if (!req.body) {
        return res.render("error", {
          error: "No se ha podido cargar la orden",
        });
      } else {
        const userId = await req.body.userId;
        const status = await req.body.status;
        const cartId = await req.body.cartId;

        const newOrder = await order.addOrderService(userId, status, cartId);
        if (newOrder == false) {
          return res.render("error", {
            error: "No se ha podido cargar la orden",
          });
        }
        return res.status(200).json(newOrder);
      }
    } catch (error) {
      logger.error.error(error);
    }
  };

  viewAllOrder = async (req, res) => {
    try {
      const orders = await order.viewAllOrderService();
      return res.status(200).json(orders);
    } catch (error) {
      logger.error.error(error);
    }
  };

  viewByIdOrder = async (req, res) => {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.render("error", {
          error: "No se ha podido cargar la orden",
        });
      } else {
        const orderById = await order.viewByIdOrderService(_id);
        return res.status(200).json(orderById);
      }
    } catch (error) {
      logger.error.error(error);
    }
  };

  deleteOrder = async (req, res) => {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.render("error", {
          error: "No se ha podido cargar la orden",
        });
      } else {
        const orderToDel = await order.deleteOrderService(_id);
        if (!orderToDel) {
          return res.render("error", {
            error: "No se ha podido cargar la orden",
          });
        }
        return res.status(200).json(orderToDel);
      }
    } catch (error) {
      logger.error.error(error);
    }
  };
}

module.exports = OrderController;
