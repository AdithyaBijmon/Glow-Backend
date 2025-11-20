const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware")
    const token = req.headers.authorization.split(" ")[1]

    try{
        const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
        req.payload = jwtResponse.userMail
        next()

    }
    catch(err){
        console.log(err)
    }

}

module.exports = jwtMiddleware