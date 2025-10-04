const express = require("express");
const {ConnectDb} = require("./connection");
const signupRouter  = require("./routes/signUp");
const ejs = require("ejs");
const path = require("path");
const staticRouter = require("./routes/staticRoute");
const {restrictToLoggedinUserOnly} = require('./middleware/auth')
const cookieParser = require('cookie-parser');
require('dotenv').config();


//start server 
const app = express();

//define port
const PORT = process.env.PORT;

//connect database
ConnectDb(process.env.MONGO_URI)
.then(()=>{
    console.log("database connected succesfully");
});



//set ejs here
app.set("view engine" , "ejs");
app.set("views" ,path.resolve("./views"));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(cookieParser())
//set two important middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


//set a default router


app.use("/home" , signupRouter);
app.use("/" , staticRouter);



app.listen(PORT , () => {
    console.log('server started at port 8002')
})
