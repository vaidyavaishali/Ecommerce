const express = require("express")
const app = express();
require("dotenv").config()
require("./dbconnection/dbConn")
const port = process.env.PORT;
const cors = require("cors")
const productroute = require("./router/productroute")
app.use("/uploads", express.static("./uploads"))
const userroute = require("./router/userroute")
app.use(cors())
app.use(express.json())
app.use(userroute)
app.use(productroute)




app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})
