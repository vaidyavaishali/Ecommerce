const express = require("express")
const route = express.Router()
const { register, login,forgotpassword, edituser, getorderfunction, getallordersfunction, orderstatusfunction} = require("../controller/userController")
const { authlogin, Admin } = require("../middlware/userauth")

route.post("/register", register)
route.post("/login", login)
route.post("/forgotpassword", forgotpassword)

route.get("/loginverify", authlogin, (req, res)=>{
    res.send({ok:"user verify successfully"})
})

route.get("/adminverify", authlogin, Admin, (req, res)=>{
    res.send({ok:"admin verify successfully"})
})

route.put("/edit", authlogin, edituser)

// route.get("/userorders", authlogin, getorderfunction)
//admin orders
// route.get("/allarders", authlogin, Admin, getallordersfunction)

//status update
// route.put("/orderstatus/:id", authlogin, Admin, orderstatusfunction)


module.exports = route