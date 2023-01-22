const express = require('express')
const router = express.Router()

const { authMiddleware, noteValidation } = require('../middlewares')
const { noteController, resourcesController } = require('../controllers')

router.get('/get_notes', authMiddleware, noteController.getNotes)
router.get('/get_note', authMiddleware, noteController.getNote)
router.post(
  '/add_note',
  authMiddleware,
  resourcesController.getResourceForSchema,
  noteValidation.note,
  noteController.addNote,
)
router.post('/set_note', authMiddleware, noteValidation.note, noteController.setNote)
router.post('/delete_note', authMiddleware, noteController.deleteNote)

module.exports = router
