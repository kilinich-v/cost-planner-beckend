const Joi = require('joi')

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  })

  const validation = schema.validate(req.body)

  if (validation.error) {
    const error = validation.error.details.context.label

    return res.status(200).json({ status: 'fail', error: `missing required '${error}' field` })
  } else {
    next()
  }
}

module.exports = { validateRegister }
