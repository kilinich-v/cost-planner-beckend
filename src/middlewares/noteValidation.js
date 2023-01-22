const Joi = require('joi')

const createShape = (note_type, resources) => {
  const noteSectionsArray = Object.values(resources.note_sections)

  return Joi.number()
    .valid(
      ...noteSectionsArray.reduce(
        (acc, noteSection) => (noteSection.note_type === note_type ? [...acc, noteSection.id] : acc),
        [],
      ),
    )
    .required()
}

const note = (req, res, next) => {
  const noteTypesId = Object.values(req.resources.note_types).map(type => type.id)

  const schema = Joi.object({
    owner: Joi.string().required(),
    note_type: Joi.number()
      .valid(...noteTypesId)
      .required(),
    note_section: createShape(req.body.note_type, req.resources),
    money: Joi.number().required(),
    currency: Joi.any().valid('UAH', 'USD', 'EUR').required(),
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
