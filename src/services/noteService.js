const { Note } = require('../schemas')

const getNotes = async owner => {
  return await Note.find({ owner })
}

const getNote = async id => {
  return await Note.findById(id)
}

const addNote = async note => {
  const newNote = new Note(note)

  return await newNote.save()
}

const setNote = async (id, note) => {
  return await Note.findByIdAndUpdate(id, { $set: note }, { new: true })
}

const deleteNote = async id => {
  return await Note.findByIdAndDelete(id)
}

module.exports = { getNotes, getNote, addNote, setNote, deleteNote }
