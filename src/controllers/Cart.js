const CartService = require("../service/CartService.js");
const cart = new CartService();
const logger = require("../helpers/winston.js");

class CartController {
  addCart = async (req, res) => {
    try {
      if (!req.body) {
        return res.render("error", {
          error: "No se ha podido agregar nuevo producto",
        });
      } else {
        const data = await { ...req.body };
        const newProducto = await cart.addCartService(data);
        if (newProducto == false) {
          return res.render("error", {
            error: "No se ha podido agregar nuevo producto",
          });
        }
        return res.status(200).json(newProducto);
      }
    } catch (error) {
      logger.error.error(error);
    }
  };

  viewAllCart = async (req, res) => {
    try {
      const productos = await cart.viewAllCartService();
      return res.status(200).json(productos);
    } catch (error) {
      logger.error.error(error);
    }
  };

  viewByIdCart = async (req, res) => {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.render("error", { error: "Producto no encontrado" });
      } else {
        const prodById = await cart.viewByIdCartService(_id);
        return res.status(200).json(prodById);
      }
    } catch (error) {
      logger.error.error(error);
    }
  };

  deleteCart = async (req, res) => {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.render("error", { error: "Producto no encontrado" });
      } else {
        const prodToDel = await cart.deleteCartService(_id);
        if (!prodToDel) {
          return res.render("error", { error: "Producto no encontrado" });
        }
        return res.status(200).json(prodToDel);
      }
    } catch (error) {
      logger.error.error(error);
    }
  };

  async updateCart(req, res) {
    const _id = req.params.id;
    const data = { ...req.body };
    try {
      const cartUpdated = await cart.updateCartService(_id, data);
      return res
        .status(200)
        .json({ cartUpdated, mensaje: "Producto actualizado correctamente" });
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = CartController;
