const { Note } = require('../schemas')

const getNotes = async owner => {
  const notes = await Note.find({ owner })
  return notes.map(note => note.normalize())
}

const getNote = async (id, userId) => {
  const note = await Note.findById(id)

  if (userId !== note.owner) return null

  return note.normalize()
}

const addNote = async (note, id) => {
  if (note.owner !== id) {
    return null
  }

  const newNote = new Note(note)

  await newNote.save()
  return newNote.normalize()
}

const setNote = async (id, note) => {
  const modifiedNote = await Note.findByIdAndUpdate(id, { $set: note }, { new: true })

  return modifiedNote.normalize()
}

const deleteNote = async id => {
  return await Note.findByIdAndDelete(id)
}

module.exports = { getNotes, getNote, addNote, setNote, deleteNote }
