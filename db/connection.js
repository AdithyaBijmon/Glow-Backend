const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("Database connected...")
}).catch(err=>{
    console.log(err)
})