const express = require('express')
const router = express.Router()

const { authMiddleware, noteValidation } = require('../middlewares')
const { noteController } = require('../controllers')

router.post('/add_note', noteValidation.newNote, noteController.addNote)

module.exports = router
