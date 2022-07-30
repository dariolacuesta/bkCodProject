const express = require("express");
const Mensaje = require("../controllers/Mensaje.js");
const validate = require("../middlewares/auth.js");
const routerMsg = express.Router();
const msg = new Mensaje();

routerMsg.get("/", validate, msg.chatGet);
routerMsg.get("/:email", validate, msg.userMsg);

module.exports = routerMsg;
