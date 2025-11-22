const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./db/connection')


require('dotenv').config()
const glowServer = express()

glowServer.use(cors())

glowServer.use(express.json())

glowServer.use(router)
glowServer.use('/uploads',express.static('./uploads'))
glowServer.use('/pdf',express.static('./pdf'))

const PORT = 3000

glowServer.get('/',(req,res)=>{
    res.send("<div style='width: 100%;height: 100vh;display: flex;justify-content: center;align-items: center;margin:10px 0px';><h1 style='color: blue;'>Glow Server running!</h1> <img src='https://assets-v2.lottiefiles.com/a/c63b66a8-b157-11ee-8547-c3a8bded43e8/4r6kcDTZM1.gif' ></div>")
   
})


glowServer.listen(PORT,(req,res)=>{
  console.log('Glow Server Started...')
  
})


