const Productmodel = require("../models/Productmodels")
const braintree = require("braintree");
require("dotenv").config();
const Ordermodel = require("../models/Ordermodel")

//PAYMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
    environment:braintree.Environment.Sandbox,
    merchantId:process.env.MERCHANT_ID,
    publicKey:process.env.PUBLIC_KEY,
    privateKey:process.env.PRIVATE_KEY
})


exports.Addproduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.body;
        const img = req.file.filename;
        if (!name || !description || !category || !price || !quantity || !img) {
            return res.status(400).send("pls filled all your field");
        }
        const newproduct = new Productmodel({
            name, description, category, price, quantity, shipping, img
        })
        const saveproduct = await newproduct.save();
        res.status(200).send({ message: "Successafully create product", saveproduct })


    } catch (error) {
        res.status(404).send({ error, message: error.message })
    }
}

exports.Allproduct = async (req, res) => {
    try {
        const products = await Productmodel.find({}).sort({ createdAt: -1 });
        res.status(200).send({
            message: "all product get successfully", products
        });

    } catch (error) {
        res.status(404).send({ error, message: error.message })
    }
}

exports.singleproduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Productmodel.findOne({ _id: id })
        res.status(200).send({ message: "single product found", product })

    } catch (error) {
        res.status(404).send({ error, message: error.message })
    }
}

// edit product

exports.EditProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price, quantity, img } = req.body;
        const file = req.file ? req.file.filename : img;
        const updateProduct = await Productmodel.findByIdAndUpdate(
            { _id: id }, { name, description, price, category, img:file, quantity });
        res.status(200).send(updateProduct);

    } catch (error) {
        res.status(404).send({ error, message: error.message })
    }

}

//---------------------------------deleteProduct----------------------------------------//
exports.Deleteproduct = async(req, res)=>{
    try {
        await Productmodel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send("product delete successfully")
        
    } catch (error) {
        res.status(404).send({ error, message: error.message })
    }
}

//braintree token function

exports.braintreetokenfunction = async(req, res)=>{
    try {
        gateway.clientToken.generate({}, function(err, response){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).send(response)
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(404).send({ error, message: error.message })
    }
}

//payment processing

exports.braintreepaymentfunction = async(req, res)=>{
    try {
      
     const {cart, nonce} = req.body;
     let total = 0;
     cart.map((i)=>{
        total += i.price;
     })
     let newtransaction = gateway.transaction.sale({
        amount:total,
        paymentMethodNonce:nonce,
        options:{
            submitForSettlement:true
        }
     }, function(error, result){
        if(result){
        const order = new Ordermodel({products:cart, payment:result, buyer:req.user._id}).save();
        res.json({
            ok:true
        })
        }else{
            res.status(500).send(error)
        }
     })
        
    } catch (error) {
        console.log(error)
        res.status(404).send({ error, message: error.message })
    }
}