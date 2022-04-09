const userValidation = require('./userValidation')
const noteValidation = require('./noteValidation')
const authMiddleware = require('./authMiddleware')

module.exports = { userValidation, noteValidation, authMiddleware }
