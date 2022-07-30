const express = require("express");
const CartController = require("../controllers/Cart.js");
const cartRoutes = express.Router();
const cart = new CartController();
const validate = require("../middlewares/auth.js");


cartRoutes.get("/", validate, cart.viewAllCart);
cartRoutes.get("/:id", validate, cart.viewByIdCart);
cartRoutes.post("/", validate, cart.addCart);
cartRoutes.delete("/:id", validate, cart.deleteCart);
cartRoutes.put("/:id", validate, cart.updateCart);

module.exports = cartRoutes;
