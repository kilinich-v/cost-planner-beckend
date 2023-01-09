const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = require('../schemas')
const { NotAuthorizedError } = require('../helpers/errors')

const authMiddleware = (req, res, next) => {
  const auth = req.headers['authorization']

  if (!auth) {
    throw new NotAuthorizedError('Not authorized')
  }
  const [_, token] = auth.split(' ')

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    try {
      if (!decoded?.id || err) {
        throw new NotAuthorizedError('Not authorized')
      }

      const user = await User.findById(decoded.id)

      if (!user || !user.token || user.token !== token) {
        throw new NotAuthorizedError('Not authorized')
      }

      req.user = user
      next()
    } catch (err) {
      next(err)
    }
  })
}

module.exports = authMiddleware
