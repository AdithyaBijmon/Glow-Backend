const express = require('express')
const { registerController, loginController, editUserController, editAdminController } = require('../controllers/userController')
const multerConfig = require('../middlewares/serviceImageUpload')
const { addService, getServices, removeService, getHomeServices } = require('../controllers/serviceController')
const adminJwtMiddleware = require('../middlewares/jwtAdminMiddleware')

const { addJob, getAllJobs, removeJob, getAllUserJobs } = require('../controllers/jobController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = express.Router()
 

router.post('/register',registerController)
router.post('/login',loginController)

// ----------user--------------
router.get('/home-services',getHomeServices)
router.get('/all/user/jobs',jwtMiddleware,getAllUserJobs)
// ----------admin---------------
router.post('/add-service',adminJwtMiddleware,multerConfig.single('serviceImg'),addService)
router.get('/all-services',getServices)
router.delete('/remove/:id/service',adminJwtMiddleware,removeService)
router.post('/add-job',adminJwtMiddleware,addJob)
router.get('/all-jobs',adminJwtMiddleware,getAllJobs)
router.delete('/remove/:id/job',adminJwtMiddleware,removeJob)
router.put('/edit/admin',adminJwtMiddleware,multerConfig.single('profile'),editAdminController)




module.exports = router;