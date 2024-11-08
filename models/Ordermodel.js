const mongoose = require("mongoose")
const OrderSchema = new mongoose.Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:"Product",
        }
    ],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },

}, {timestamps:true})

const OrderModel = mongoose.model("order", OrderSchema)
module.exports = OrderModel;