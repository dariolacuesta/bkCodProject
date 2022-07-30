const DatabaseProductoDao = require("../DAO/ProductoDAO.js");
const ProductoModel = require("../models/productoSchema.js");
const logger = require("../helpers/winston.js");
const MongoCxn = require("../database/MongoCxn.js");

class ProductoMongo extends DatabaseProductoDao {
  

  async addPersistenceProducto(dataToDb) {
    try {
      const newProd = await ProductoModel.create(dataToDb);
      return newProd;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllPersistenceProducto() {
    try {
      const prodInDb = await ProductoModel.find({});
      return prodInDb;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDPersistenceProducto(_id) {
    try {
      const prodById = await ProductoModel.findOne({ _id });
      return prodById;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByCategoryPersistenceProducto(category) {
    try {
      const prodByCategory = await ProductoModel.find({
        category: { $eq: category }
      });
      if (prodByCategory) {
        return prodByCategory;
      }
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deletePersistenceProducto(_id) {
    try {
      const prodToDel = await ProductoModel.deleteOne({ _id });
      return prodToDel;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updatePersistenceProducto(_id, data) {
    try {
      const prodUpdated = await ProductoModel.updateOne({ _id }, data, {
        new: true,
      });
      return prodUpdated;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = ProductoMongo;
