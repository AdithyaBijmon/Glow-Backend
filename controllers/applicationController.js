const applications = require("../models/applicationModel");

exports.addApplication = async (req, res) => {
    console.log("Inside add application");

    const { fullName, email, qualification, phone, jobTitle, jobId } = req.body
    const resume = req.file.filename

    try {

        const existingApplication = await applications.findOne({ email, jobId })
        if (existingApplication) {
            res.status(409).json("You already applied this job.")
        }
        else {
            const newApplication = new applications({
                fullName, email, qualification, phone, resume, jobTitle, jobId
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }

    }
    catch (err) {
        res.status(500).json(err)
    }

}

exports.getAllApplications = async (req, res) => {
    console.log("Inside get all applications")

    try {

        const allApplications = await applications.find()
        res.status(200).json(allApplications)

    }
    catch (err) {
        res.status(500).json(err)
    }
}