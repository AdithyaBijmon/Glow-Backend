const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    serviceId:{
        type:String,
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    }


})

const appointments = mongoose.model("appointments",appointmentSchema)
module.exports = appointments