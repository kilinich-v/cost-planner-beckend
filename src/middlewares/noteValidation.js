const Joi = require('joi')

const newNote = (req, res, next) => {
  const schema = Joi.object({
    owner: Joi.string().required(),
    // noteType: Joi.any().valid('income', 'spending').required(),
    // noteSection: Joi.any().valid('food', 'technics', 'leisure', 'sport', 'relaxation'),
    noteType: Joi.string().required(),
    noteSection: Joi.string(),
    money: Joi.number().required(),
    date_create: Joi.date().timestamp(),
  })

  const validation = schema.validate(req.body)

  if (validation.error) {
    const error = validation.error.details.context.label

    return res.status(200).json({ status: 'fail', error: `missing required '${error}' field` })
  } else {
    next()
  }
}

module.exports = { newNote }
