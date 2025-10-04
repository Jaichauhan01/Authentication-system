const express = require("express");
const {handleSignUp , handleLogin , logOut} = require("../controller/controller")
const route = express.Router();


route.post("/signUp",handleSignUp );
route.post('/login', handleLogin);
route.get('/logout' , logOut);

module.exports = route;