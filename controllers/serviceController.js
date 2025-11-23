const services = require("../models/serviceModel")

exports.addService = async (req, res) => {
    console.log("Inside add service")

    const { serviceName, description, category, price,duration } = req.body
    const serviceImg = req.file.filename
    // console.log(req.file)


    try {
        const ExistingService = await services.findOne({ serviceName })

        if (ExistingService) {
            res.status(409).json("Service already added.")
        }
        else {
            const newService = new services({
                serviceName, description, category, price, serviceImg,duration
            })
            await newService.save()
            res.status(200).json(newService)

        }
    }
    catch (err) {
        res.status(500).json(err)
    }

}

exports.getServices = async (req, res) => {
    console.log("Inside get services")
    const searchKey = req.query.search

    const query = {
        serviceName:{$regex:searchKey,$options:'i'}
    }

    try {
        const allServices = await services.find(query)
        res.status(200).json(allServices)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getAdminAllServices = async (req, res) => {
    console.log("Inside get services")

    try {
        const allServices = await services.find()
        res.status(200).json(allServices)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.viewSingleService = async (req,res)=>{
    console.log("Inside view Single Service");
    const {id} = req.params

    try {
        const viewService = await services.findById({_id:id})
        res.status(200).json(viewService)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.getHomeServices = async (req,res)=>{
    console.log("Inside get home Services")
    try{

        const getHomeServicesList = await services.find().sort({_id:-1}).limit(4)
        res.status(200).json(getHomeServicesList)

    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.removeService = async (req, res) => {
    console.log("Inside remove Service")
    const { id } = req.params
    try {

        const removeServiceDetails = await services.findByIdAndDelete({ _id: id })
        res.status(200).json(removeServiceDetails)

    }
    catch (err) {
        res.status(500).json(err)
    }
}