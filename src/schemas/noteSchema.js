const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
  id: {
    type: Number,
    required: [true, 'Owner is required'],
  },
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
    default: '',
  },
  money: {
    type: Number,
    required: [true, 'Money is required'],
  },
  currency: {
    type: String,
    require: [true, 'Currency is required'],
  },
  date_create: {
    type: Number,
    default: Date.now(),
    required: true,
  },
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note
