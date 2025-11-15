const services = require("../models/serviceModel")

exports.addService = async (req, res) => {
    console.log("Inside add service")

    const { serviceName, description, category, price } = req.body
    const serviceImg = req.file.filename
    // console.log(req.file)
    

    try {
        const ExistingService = await services.findOne({ serviceName })

        if (ExistingService) {
            res.status(409).json("Service already added.")
        }
        else {
            const newService = new services({
                serviceName, description, category, price, serviceImg
            })
            await newService.save()

        } 
    }
    catch (err) {
        res.status(500).json(err)
    }

}

exports.getServices = async(req,res)=>{
    console.log("Inside get services")

    try{
        const allServices = await services.find()
        res.status(200).json(allServices)
    }
    catch(err){
        res.status(500).json(err)
    }
}