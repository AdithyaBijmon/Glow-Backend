const jobs = require("../models/jobModel")

exports.addJob = async (req,res) =>{
    console.log("Inside add job")

    const {jobTitle,jobDescription,jobType,salary,experience,qualification,eligibility} = req.body

    try {

        const existingJob = await jobs.findOne({jobTitle})
        if(existingJob){
            res.status(409).json("Job already added.")
        }
        else {
            const newJob = new jobs({
                jobTitle,jobDescription,jobType,salary,experience,qualification,eligibility
            })
            await newJob.save()
            res.status(200).json(newJob)
        }

    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getAllJobs = async(req,res)=>{
    console.log("Iniside get All Jobs")

    try{

        const allJobs = await jobs.find()
        res.status(200).json(allJobs)

    }
    catch(err){
        res.status(500).json(err)
    }
}