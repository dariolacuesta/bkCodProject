const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema(
  {
    buyer: [],
    status: { type: String, default: "Generada" },
    items: [],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("OrderModel", orderSchema);
