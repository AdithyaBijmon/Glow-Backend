const express = require('express')
const { registerController, loginController } = require('../controllers/userController')
const multerConfig = require('../middlewares/serviceImageUpload')
const { addService, getServices, removeService } = require('../controllers/serviceController')
const adminJwtMiddleware = require('../middlewares/jwtAdminMiddleware')
const { addJob, getAllJobs } = require('../controllers/jobController')

const router = express.Router()
 

router.post('/register',registerController)
router.post('/login',loginController)
// ----------admin---------------
router.post('/add-service',adminJwtMiddleware,multerConfig.single('serviceImg'),addService)
router.get('/all-services',adminJwtMiddleware,getServices)
router.delete('/remove/:id/service',adminJwtMiddleware,removeService)
router.post('/add-job',adminJwtMiddleware,addJob)
router.get('/all-jobs',adminJwtMiddleware,getAllJobs)




module.exports = router;