const express = require('express');
const passport = require('passport');
const User = require('../controllers/Users.js');
const validate = require('../middlewares/auth.js');
const usersRoutes = express.Router();
const user = new User();


usersRoutes.get('/register', user.registerGet)
usersRoutes.get('/main', validate, user.mainGet)
usersRoutes.get('/chat', validate, user.chatGet)
usersRoutes.get('/logout', validate, user.logout)
usersRoutes.get('/login', user.loginGet)

usersRoutes.post('/register', passport.authenticate("register", {
    successRedirect: "/user/login",
    failureRedirect: "/user/register",
    failureFlash: true,
    successFlash: true
}))


usersRoutes.post('/login', passport.authenticate("login", {
    successRedirect: "/user/main",
    failureRedirect: "/user/login",
    failureFlash: true,
    successFlash: true
}))



module.exports =  usersRoutes;