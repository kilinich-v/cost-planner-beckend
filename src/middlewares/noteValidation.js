const Joi = require('joi')

const createShape = noteType => {
  return noteType === 'spending'
    ? Joi.any()
        .valid('food', 'technics', 'leisure', 'sport', 'relaxation')
        .required('NoteType can be income or spending')
    : Joi.any().valid('salary', 'deposit', 'saving').required()
}

const newNote = (req, res, next) => {
  const schema = Joi.object({
    owner: Joi.string().required(),
    noteType: Joi.any().valid('income', 'spending').required(),
    noteSection: createShape(req.body.noteType),
    money: Joi.number().required(),
    currency: Joi.any().valid('uah', 'usd', 'eur').required(),
    date_create: Joi.date().timestamp(),
  })

  console.dir(schema.validate(req.body))
  const validation = schema.validate(req.body)

  if (validation.error) {
    const error = validation.error.message

    return res.status(200).json({ status: 'fail', error })
  } else {
    next()
  }
}

module.exports = { newNote }
