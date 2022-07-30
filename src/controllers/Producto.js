const FactoryProducto = require("../factory/factoryProducto.service.js");
const logger = require("../helpers/winston.js");
const config = require("../config/index.js");
const factory = new FactoryProducto(parseInt(config.DATABASE));

class Producto {
  async add(req, res) {
    try {
      if (!req) {
        return res.render("error", {
          error: "Error al agregar un producto",
        });
      }
      const data = await req.body;
      factory.addServiceProducto(data);
      return res.redirect("/user/main");
    } catch (error) {
      logger.error.error(error);
    }
  }

  async addBySocket(req, res) {
    try {
      if (!req) {
        return res.render("error", {
          error: "Error al agregar un producto",
        });
      }
      const data = await req.producto;
      factory.addServiceProducto(data);
      return res.redirect("/user/main");
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAll(req, res) {
    try {
      const prodInDb = await factory.findAllServiceProducto();
      if (!prodInDb) {
        res.status(404).send({ mensaje: "No hay producto" });
      }
      return res.status(200).json(prodInDb);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByID(req, res) {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.render("error", {
          error: "Producto no encontrado",
        });
      }
      const prodById = await factory.findByIDServiceProducto(_id);
      if (!prodById) {
        return res.render("error", {
          error: "Producto no encontrado o inexistente",
        });
      }
      return res.status(200).json(prodById);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async viewByCategory(req, res) {
    try {
      const category = await req.params.category;
      const prodByCategory = await factory.findByCategory(category);
      if (prodByCategory) {
        return res.status(200).json(prodByCategory);
      }
    } catch (error) {
      return res.status(400).json({ mensaje: "Ocurrió un error", error });
    }
  }

  async deleteProd(req, res) {
    const _id = req.params.id;
    try {
      if (_id === "") {
        return res.render("error", {
          error: "No hay ID informada",
        });
      }
      const prodToDel = await factory.deleteServiceProducto(_id);
      if (!prodToDel) {
        return res.render("error", {
          error: "Producto no encontrado o inexistente",
        });
      }
      return res.status(200).json({ mensaje: "Producto eliminado con éxito" });
    } catch (error) {
      logger.error.error(error);
    }
  }

  async update(req, res) {
    const _id = req.params.id;
    const data = { ...req.body };
    try {
      const prodUpdated = await factory.updateServiceProducto(_id, data);
      return res
        .status(200)
        .json({ prodUpdated, mensaje: "Producto actualizado correctamente" });
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = Producto;
