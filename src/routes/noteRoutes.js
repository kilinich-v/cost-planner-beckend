const express = require('express')
const router = express.Router()

const { authMiddleware, noteValidation } = require('../middlewares')
const { noteController } = require('../controllers')

router.get('/get_notes', noteController.getNotes)
router.get('/get_note', noteController.getNote)
router.post('/add_note', noteValidation.note, noteController.addNote)
router.post('/set_note', noteValidation.note, noteController.setNote)
router.post('/delete_note', noteController.deleteNote)

module.exports = router
