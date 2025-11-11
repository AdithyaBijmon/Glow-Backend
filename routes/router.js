const express = require('express')
const { registerController, loginController } = require('../controllers/userController')

const router = express.Router()
 

router.post('/register',registerController)
router.post('/login',loginController)

// router.post('/add-service')


module.exports = router;