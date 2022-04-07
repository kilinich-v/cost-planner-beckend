const express = require('express')
const router = express.Router()

const { validateRegister } = require('../middlewares/userValidation')
const { register } = require('../controllers/authController')

router.post('/register', validateRegister, register)
router.post('/login')
router.post('/logout')

module.exports = router
