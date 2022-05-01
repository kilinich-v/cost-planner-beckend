const express = require('express')
const router = express.Router()

const { userValidation, authMiddleware } = require('../middlewares')
const { authController } = require('../controllers')
const { asyncErrorsWrapper } = require('../helpers')

router.post('/register', userValidation.register, asyncErrorsWrapper(authController.register))
router.post('/login', userValidation.login, asyncErrorsWrapper(authController.login))
router.post('/logout', authMiddleware, asyncErrorsWrapper(authController.logout))
router.get('/current', authMiddleware, asyncErrorsWrapper(authController.current))

module.exports = router
