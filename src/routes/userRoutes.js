const express = require('express')
const router = express.Router()

const { userValidation, authMiddleware } = require('../middlewares')
const { authController } = require('../controllers')

router.post('/register', userValidation.register, authController.register)
router.post('/login', userValidation.login, authController.login)
router.post('/logout')
router.post('/current_user', authMiddleware)

module.exports = router
