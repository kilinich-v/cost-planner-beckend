const { resourceService } = require('../services')
const db = require('../db')

const getResourceForNotes = async (req, res, next) => {
  try {
    const resources = await resourceService.getResourcesForNotes()

    if (resources) {
      return res.status(200).json({ data: resources })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getResourceForNotes }
