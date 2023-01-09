const { Resources } = require('../schemas')

const getResourcesForNotes = async () => {
  const resources = await Resources.findOne({})

  return resources.normalize()
}

module.exports = { getResourcesForNotes }
