const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    nickName:String,
    coins:Number,
});

