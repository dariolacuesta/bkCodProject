const MensajePersistence = require("../db_persistence/mensajesPersistence.js");
const dbMensaje = new MensajePersistence();
const logger = require("../helpers/winston.js");

async function addMsgService(data) {
  try {
    const newMsg = await dbMensaje.addMsgPersistence(data);
    return newMsg;
  } catch (error) {
    logger.error.error(error);
  }
}

async function findAllMsgService() {
  try {
    const mensajes = await dbMensaje.findAllMsgPersistence();
    //const id = 'mensajes';
    return mensajes;
  } catch (error) {
    logger.error.error(error);
  }
}

async function userMsgService(email) {
  try {
    const allUserMsg = await dbMensaje.userMsgPersistence(email);
    if (allUserMsg) {
      return allUserMsg;
    }
  } catch (error) {
    logger.error.error(error);
  }
}

module.exports = {
  addMsgService,
  findAllMsgService,
  userMsgService,
};
