const { Note } = require('../schemas')

const addNote = async note => {
  const newNote = new Note(note)

  return await newNote.save()
}

const setNote = async (id, note) => {
  return await Note.findByIdAndUpdate(id, { $set: note }, { new: true })
}

const deleteNote = async id => {
  await Note.findByIdAndDelete(id)
}

module.exports = { addNote, setNote, deleteNote }
