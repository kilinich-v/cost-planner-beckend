const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Owner is required'],
    ref: 'users',
  },
  note_type: {
    type: String,
    require: [true, 'Type is required'],
  },
  note_section: {
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

noteSchema.method('normalize', function () {
  const note = this.toObject()
  note.id = note._id

  delete note._id
  delete note.__v

  return note
})

const Note = mongoose.model('note', noteSchema)

module.exports = Note
