const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema(
  {
    title: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
    thumbnail: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("ProductoModel", productoSchema);
