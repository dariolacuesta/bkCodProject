const express = require("express");
const orderRoutes = express.Router();
const OrderController = require("../controllers/Order.js");
const order = new OrderController();
const validate = require("../middlewares/auth.js");

orderRoutes.get("/", validate, order.viewAllOrder);
orderRoutes.get("/:id", validate, order.viewByIdOrder);
orderRoutes.post("/", validate, order.addOrder);
orderRoutes.delete("/:id", validate, order.deleteOrder);

module.exports = orderRoutes;
