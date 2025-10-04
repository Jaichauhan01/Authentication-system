const express = require("express");
const {r} = require('../middleware/auth')
const StaticRouter = express.Router();
const {restrictToLoggedinUserOnly, restricToroles} = require('../middleware/auth')


StaticRouter.get("/signUp" , (req, res) => {
    return res.render('signup');
})
StaticRouter.get("/login", (req , res) => {
    return res.render('login');
})

StaticRouter.get("/home" , (req , res) => {
    return res.render("home");
});

StaticRouter.get("/admin" ,restrictToLoggedinUserOnly, restricToroles(["ADMIN"]),(req , res) => {
    return res.render("admin_panel");
});
module.exports = StaticRouter;