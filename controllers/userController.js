const users = require("../models/userModel")
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    console.log("Inside register controller")

    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(409).json("User Already exists!")
        }
        else {
            const newUser = new users({
                username,
                email,
                password
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(500).json("Something Wrong", err)
    }
}

exports.loginController = async (req, res) => {
    console.log("Inside login controller")

    const { email, password } = req.body

     try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            if (existingUser.password == password) {
                // token
                const token = jwt.sign({ userMail: existingUser.email,role:existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
            }
            else {
                res.status(401).json("Invalid email or password")
            }

        }
        else {

            res.status(404).json("Account does not exist!")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

