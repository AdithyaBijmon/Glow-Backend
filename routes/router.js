const express = require('express')
const { registerController, loginController } = require('../controllers/userController')
const multerConfig = require('../middlewares/serviceImageUpload')
const { addService, getServices } = require('../controllers/serviceController')
const adminJwtMiddleware = require('../middlewares/jwtAdminMiddleware')

const router = express.Router()
 

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/add-service',adminJwtMiddleware,multerConfig.single('serviceImg'),addService)
router.get('/all-services',adminJwtMiddleware,getServices)




module.exports = router;