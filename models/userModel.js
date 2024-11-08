const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const secretkey = process.env.KEY;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    secreteanswer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },

})

//------------------------------------token generate------------------------------------------//
userSchema.methods.generatetoken = function(){
    try {
        let usertoken = jwt.sign({_id:this._id},secretkey);
        return usertoken;
    } catch (error) {
        console.log(error)
    }
}


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel