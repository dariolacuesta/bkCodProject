const MongoCxn = require("../database/MongoCxn.js");

class CxnMongoDAO {
  constructor() {
    this.cxn = new MongoCxn();
    this.msg = console.log("*** Base de Datos Mongo");
  }
}

module.exports = CxnMongoDAO;


