const users = require("../models/userModel")

exports.registerController = async (req,res)=>{
    console.log("Inside register controller")

    const {username,email,password} = req.body

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User Already exists!")
        }
        else{
            const newUser = new users({
                username,
                email,
                password
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json("Something Wrong",err)
    }
}

exports.loginController = async (req,res)=>{
    console.log("Inside login controller")

    const {email,password} = req.body

    try{
        const existingUser = await users.findOne({email})
        if(!existingUser){
            res.status(404).json("You have'nt registered.Please register first and login.")
        }
        else{
            if(existingUser.password==password){
                res.status(200).json("Logged in successfully.")
            }
            else{
                res.status(401).json("Invalid email or password")
            }
            

        }
    }
    catch(err){
        res.status(500).json("Something Wrong",err)
    }
}

