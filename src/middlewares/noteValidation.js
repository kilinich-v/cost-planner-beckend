const Joi = require('joi')

const createShape = note_type => {
  return note_type === 'spending'
    ? Joi.any().valid('food', 'technics', 'leisure', 'sport', 'relaxation').required()
    : Joi.any().valid('salary', 'deposit', 'saving').required()
}

const note = (req, res, next) => {
  const schema = Joi.object({
    // owner: Joi.string().required(),
    note_type: Joi.any().valid('income', 'spending').required(),
    note_section: createShape(req.body.note_type),
    money: Joi.number().required(),
    currency: Joi.any().valid('uah', 'usd', 'eur').required(),
    date_create: Joi.date().timestamp(),
  })

  const validation = schema.validate(req.body)

  if (validation.error) {
    const error = validation.error.message

    return res.status(200).json({ status: 'fail', error })
  } else {
    next()
  }
}

module.exports = { note }
