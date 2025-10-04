const { sign } = require("crypto");
const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require('bcrypt');

//create schema
const SignUpSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type :String,
        required : true,
    },
    role : {
        type : String,
        required : true, 
        default : "NORMAL"
    }
},{timestamps : true});

SignUpSchema.pre("save" ,async function (next){
    if(!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password , 10);
    } catch (error) {
        return null
    }
})

const signUp = mongoose.model("userData" , SignUpSchema);

module.exports = signUp;