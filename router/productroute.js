const express = require("express");
const { authlogin, Admin } = require("../middlware/userauth");
const upload = require("../middlware/uploads");
const { Addproduct, Allproduct, singleproduct,EditProduct,Deleteproduct,braintreetokenfunction, braintreepaymentfunction } = require("../controller/ProductController");
const route = express.Router()
route.post("/addproduct", upload.single("img"), authlogin, Admin, Addproduct);
route.get("/singleproduct/:id", singleproduct);

route.get("/allproduct", Allproduct)
route.put("/editproduct/:id", upload.single("img"), authlogin, Admin, EditProduct)

route.delete('/deleteproduct/:id', authlogin, Admin, Deleteproduct)
route.get("/braintree/token", braintreetokenfunction)

route.post('/braintree/payment', authlogin, braintreepaymentfunction)


module.exports = route;