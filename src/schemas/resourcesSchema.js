const mongoose = require('mongoose')
const { Schema } = mongoose

const resourcesSchema = new Schema({
  note_types: {
    type: Object,
  },
  note_sections: {
    type: Object,
  },
})

resourcesSchema.method('normalize', function () {
  const resources = this.toObject()

  delete resources._id
  delete resources.__v

  return resources
})

const Resources = mongoose.model('resource', resourcesSchema)

module.exports = Resources
