const logger = require("../helpers/winston.js");
const ProductoMongo = require("../db_persistence/ProductoMongo.js");
const database = "";

class FactoryProducto {
  constructor(number) {
    this.database = database;
    switch (number) {
      //example
      // case 1:
      //   this.database = new ProductoArray();
      //   break;
      default:
        this.database = new ProductoMongo();
        break;
    }
  }

  async addServiceProducto(data) {
    try {
      const dataToDb = {
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        description: data.description,
        category: data.category,
        stock: data.stocK,
      };

      const prod = await this.database.addPersistenceProducto(dataToDb);
      return prod;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllServiceProducto() {
    try {
      const prodInDb = await this.database.findAllPersistenceProducto();
      return prodInDb;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByIDServiceProducto(id) {
    try {
      const prodById = await this.database.findByIDPersistenceProducto(id);
      return prodById;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findByCategory(category) {
    try {
      const prodByCategory =
        await this.database.findByCategoryPersistenceProducto(category);
      if (prodByCategory) {
        return prodByCategory;
      }
    } catch (error) {
      logger.error.error(error);
    }
  }

  async deleteServiceProducto(id) {
    try {
      const prodToDel = await this.database.deletePersistenceProducto(id);
      return prodToDel;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async updateServiceProducto(id, data) {
    try {
      const prodUpdated = await this.database.updatePersistenceProducto(
        id,
        data
      );
      return prodUpdated;
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = FactoryProducto;
