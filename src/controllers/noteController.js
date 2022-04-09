const { noteService } = require('../services')

const addNote = async (req, res, next) => {
  console.log(req)
  const note = req.body

  try {
    const newNote = noteService.addNote(note)

    if (newNote) return res.status(200).json({ status: 'success', data: newNote })
  } catch (error) {
    next(error)
  }
}

module.exports = { addNote }
