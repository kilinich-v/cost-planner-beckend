const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares')
const { resourcesController } = require('../controllers')

router.get('/get_resource_for_notes', resourcesController.getResourceForNotes)

module.exports = router
