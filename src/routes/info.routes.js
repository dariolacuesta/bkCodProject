const express = require("express");
const InfoController = require("../controllers/Info.js");
const infoRoutes = express.Router();
const info = new InfoController();
const passport = require('passport');


infoRoutes.get("/", passport.authenticate('jwt', {session: false}) ,info.getInfo);


module.exports = infoRoutes;
