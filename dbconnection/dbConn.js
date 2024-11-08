const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL).then((res)=>{
    console.log("Connection Successfull")
}).catch((e)=>{
    console.log(e)
})