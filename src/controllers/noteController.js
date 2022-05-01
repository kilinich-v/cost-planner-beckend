const { noteService } = require('../services')

const getNotes = async (req, res, next) => {
  const ownerId = req.query.userId

  try {
    const notes = await noteService.getNotes(ownerId)

    if (notes) {
      return res.status(200).json({ status: 'success', data: notes })
    } else {
      return res.status(404).json({ status: 'success', error: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

const getNote = async (req, res, next) => {
  const id = req.query.id
  const userId = req.user.id

  try {
    const note = await noteService.getNote(id, userId)

    if (note) {
      return res.status(200).json({ status: 'success', data: note })
    } else {
      return res.status(404).json({ status: 'success', error: 'Note not found' })
    }
  } catch (error) {
    next(error)
  }
}

const addNote = async (req, res, next) => {
  const note = req.body
  const userId = req.user.id

  try {
    const newNote = await noteService.addNote(note, userId)

    if (newNote) {
      return res.status(201).json({ status: 'success', data: newNote })
    } else {
      return res.status(401).json({ status: 'fail', error: 'Incorrect user' })
    }
  } catch (error) {
    next(error)
  }
}

const setNote = async (req, res, next) => {
  const note = req.body
  const id = req.query.id
  const userId = req.user.id

  try {
    if (userId !== note.owner) return res.status(404).json({ status: 'success', error: 'Note not found' })
    const modifiedNote = await noteService.setNote(id, note)
    if (modifiedNote) {
      return res.status(200).json({ status: 'success', data: modifiedNote })
    }
  } catch (error) {
    next(error)
  }
}

const deleteNote = async (req, res, next) => {
  const id = req.query.id

  try {
    const deletedNote = await noteService.deleteNote(id)

    console.log(deletedNote)

    if (deletedNote) {
      return res.status(200).json({ status: 'success', data: {} })
    } else {
      return res.status(404).json({ status: 'fail', error: 'Note not found' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getNotes, getNote, addNote, setNote, deleteNote }
