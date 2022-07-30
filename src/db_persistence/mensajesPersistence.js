const MensajeModel = require("../models/mensajeSchema.js");
const logger = require("../helpers/winston.js");

class MensajePersistence {
  async addMsgPersistence(mensaje) {
    try {
      const newMsg = await MensajeModel.create(mensaje);
      return newMsg;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllMsgPersistence() {
    try {
      const mensajes = await MensajeModel.find();
      return mensajes;
    } catch (error) {
      logger.error.error(error);
    }
  }

  async userMsgPersistence(email) {
    try {
      const allUserMsg = await MensajeModel.find({
        email: { $eq: email },
      });
      if (allUserMsg) {
        return allUserMsg;
      }
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = MensajePersistence;
