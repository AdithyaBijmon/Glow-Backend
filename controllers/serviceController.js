const services = require("../models/serviceModel")

exports.addService = async (req, res) => {
    console.log("Inside add service")

    const { serviceName, description, category, price } = req.body

    try {
        const ExistingService = await services.findOne({ serviceName })

        if (ExistingService) {
            res.status(409).json("Service already added.")
        }
        else {
            const newService = new services({
                serviceName, description, category, price, serviceImg
            })
            newService.save()

        }
    }
    catch (err) {
        res.status(500).json(err)
    }

}