const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
  owner: {
    type: String,
    required: [true, 'Owner is required'],
  },
  noteType: {
    type: String,
    require: [true, 'Type is required'],
  },
  noteSection: {
    type: String,
    required: [true, 'Section is required'],
  },
  money: {
    type: Number,
    required: [true, 'Money is required'],
  },
  date_create: {
    type: Date,
    default: Date.now(),
    required: true,
  },
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note
