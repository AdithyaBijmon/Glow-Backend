const appointments = require("../models/appointmentModel");

exports.addAppointment = async (req,res)=>{
    console.log("Inside add appointment");

    const {fullName,email,phone,date,time,serviceId,serviceName} = req.body

    try {
        const existingAppointment = await appointments.findOne({email,serviceId})
        if(existingAppointment){
            res.status(409).json("You Already booked this service.")

        }
        else{
            const newAppointment = new appointments({
                fullName,email,phone,date,time,serviceId,serviceName
            })
            await newAppointment.save()
            res.status(200).json(newAppointment)
        }
        
    } catch (error) {
        res.status(200).json(error)
    }
    
}

exports.getAllAppointments = async (req,res) =>{
    console.log("Inside get all appointments");

    try {
     const allAppointments = await appointments.find()
     res.status(200).json(allAppointments)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.approveAppointment = async (req,res) =>{
    console.log("Inside approve appointment");
    const {id} = req.params

     try {
     const approveAppointment = await appointments.findByIdAndUpdate({_id:id},{status:"approved"},{new:true})
     res.status(200).json(approveAppointment)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.rejectAppointment = async (req,res) =>{
    console.log("Inside reject appointment");
    const {id} = req.params

     try {
     const rejectAppointment = await appointments.findByIdAndUpdate({_id:id},{status:"rejected"},{new:true})
     res.status(200).json(rejectAppointment)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.viewUserAppointments = async (req,res) =>{
    console.log("Inside get user appointments");
    const userMail = req.payload

    try {
     const userAppointments = await appointments.find({email:userMail}).sort({_id:-1})
     res.status(200).json(userAppointments)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}

exports.removeAppointment = async (req,res)=>{
    console.log("Inside remove appointment");
    const {id} = req.params

    try {
        const deleteAppointment = await appointments.findByIdAndDelete({_id:id})
    } catch (error) {
       res.status(500).json(error) 
    }
    
}