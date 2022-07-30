const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    direction: String,
    email: String,
    items: []
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("CartModel", cartSchema);
