const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensajeSchema = new Schema(
  {
    email: String,
    message: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("MensajeModel", mensajeSchema);
