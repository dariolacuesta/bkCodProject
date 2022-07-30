const express = require("express");
const Producto = require("../controllers/Producto.js");
const validate = require("../middlewares/auth.js");
const router = express.Router();
const nuevoProducto = new Producto();

router.post("/", validate, nuevoProducto.addBySocket);
router.post("/", validate, nuevoProducto.add);
router.get("/", validate, nuevoProducto.findAll);
router.get("/:id", validate, nuevoProducto.findByID);
router.delete("/:id", validate, nuevoProducto.deleteProd);
router.put("/:id", validate, nuevoProducto.update);
router.get("/category/:category", validate, nuevoProducto.viewByCategory);

module.exports = router;
