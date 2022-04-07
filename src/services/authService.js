const jwt = require('jsonwebtoken')
require('dotenv').config()

const { createUser, findByEmail, updateToken } = require('./userService')

const login = async ({ email, password }) => {
  const user = await findByEmail(email)
  const validatedPassword = await user?.validatePassword(password)

  if (!user || !validatedPassword) return null

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)

  await updateToken(id, token)

  return token
}

const register = async user => {
  return await createUser(user)
}

const logout = async id => {
  return await updateToken(id, null)
}

module.exports = { login, register, logout }
