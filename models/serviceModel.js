const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    serviceImg:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    }
})

const services = mongoose.model("services",serviceSchema)
module.exports = services