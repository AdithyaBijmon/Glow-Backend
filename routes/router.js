const express = require('express')
const { registerController, loginController, editUserController, editAdminController, googleLoginController } = require('../controllers/userController')
const multerConfig = require('../middlewares/serviceImageUpload')
const { addService, getServices, removeService, getHomeServices, viewSingleService, getAdminAllServices } = require('../controllers/serviceController')
const adminJwtMiddleware = require('../middlewares/jwtAdminMiddleware')

const { addJob, getAllJobs, removeJob } = require('../controllers/jobController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const { addApplication, getAllApplication, getAllApplications, adminApproveApplication, adminRejectApplication, getAllUserJobs, removeApplication } = require('../controllers/applicationController')
const pdfMulterConfig = require('../middlewares/applicationPdfUpload')
const { addAppointment, getAllAppointments, approveAppointment, rejectAppointment, viewUserAppointments, removeAppointment } = require('../controllers/appointmentController')

const router = express.Router()
 

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/google-login',googleLoginController)


// ----------user--------------
router.get('/home-services',getHomeServices)
router.get('/all-services',getServices)
router.post('/add-application',jwtMiddleware,pdfMulterConfig.single('resume'),addApplication)
router.get('/view/:id/service',jwtMiddleware,viewSingleService)
router.post('/add-appointment',jwtMiddleware,addAppointment)
router.get('/view/user/appointments',jwtMiddleware,viewUserAppointments)
router.delete('/remove/:id/appointment',jwtMiddleware,removeAppointment)
router.put('/edit/user',jwtMiddleware,multerConfig.single('profile'),editUserController)
router.get('/applied-jobs',jwtMiddleware,getAllUserJobs)
router.delete('/remove/:id/application',jwtMiddleware,removeApplication)

// ----------admin---------------
router.post('/add-service',adminJwtMiddleware,multerConfig.single('serviceImg'),addService)
router.get('/admin-all-services',getAdminAllServices)
router.delete('/remove/:id/service',adminJwtMiddleware,removeService)
router.post('/add-job',adminJwtMiddleware,addJob)
router.get('/all-jobs',adminJwtMiddleware,getAllJobs)
router.delete('/remove/:id/job',adminJwtMiddleware,removeJob)
router.put('/edit/admin',adminJwtMiddleware,multerConfig.single('profile'),editAdminController)
router.get('/all-applications',adminJwtMiddleware,getAllApplications)
router.put('/approve/:id/application',adminJwtMiddleware,adminApproveApplication)
router.put('/reject/:id/application',adminJwtMiddleware,adminRejectApplication)
router.get('/all-appointments',adminJwtMiddleware,getAllAppointments)
router.put('/approve/:id/appointment',adminJwtMiddleware,approveAppointment)
router.put('/reject/:id/appointment',adminJwtMiddleware,rejectAppointment)


module.exports = router;