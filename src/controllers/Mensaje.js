const {
  addMsgService,
  findAllMsgService,
  userMsgService,
} = require("../service/MensajeService.js");
const logger = require("../helpers/winston.js");

class Mensaje {
  async chatGet(req, res) {
    try {
      const email = await req.user.email;
      res.render("chat", { email: email });
    } catch (error) {
      logger.error.error(error);
    }
  }

  async userMsg(req, res) {
    try {
      const email = await req.user.email;
      const allUserMsg = await userMsgService(email);

      if (allUserMsg) {
        return res.status(200).json(allUserMsg);
      }
      return res.render("chatUser");
    } catch (error) {
      return res.status(400).json({ mensaje: "Ocurrió un error" });
    }
  }

  async addMsg(req, res) {
    try {
      if (!req.message) {
        return res.status(404).json({ mensaje: "Error" });
      }
      const data = await { ...req };
      await addMsgService(data.message);
    } catch (error) {
      logger.error.error(error);
    }
  }

  async findAllMsg(req, res) {
    try {
      let { id, mensajes } = await findAllMsgService();
      return res.status(200).json({ id, mensajes });
    } catch (error) {
      logger.error.error(error);
    }
  }
}

module.exports = Mensaje;
