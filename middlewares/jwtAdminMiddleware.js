const jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req, res, next) => {
    console.log("Inside jwt middleware");

    const token = req.headers.authorization.split(" ")[1]

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
        req.payload = jwtResponse.userMail
        if (jwtResponse.role == "admin") {
            next()
        }
        else{
            res.status(401).json("Unauthorised User")
        }
       


    }
    catch (err) {
        res.status(500).json("Invalid token", err)
    }
}

module.exports = adminJwtMiddleware