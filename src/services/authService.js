const jwt = require('jsonwebtoken')
require('dotenv').config()

const { NotAuthorizedError, RegistrationError, NotFoundError } = require('../helpers')

const { User } = require('../schemas')

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })
  const validatedPassword = user?.validatePassword(password)

  if (!user || !validatedPassword) return null

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)

  await updateToken(id, token)

  return token
}

const register = async user => {
  if (await User.findOne({ email: user.email })) {
    throw new RegistrationError('Email in use')
  }

  const newUser = await User(user)
  return await newUser.save()
}

const logout = async id => {
  return await User.updateOne({ _id: id }, { token })
}

const current = async id => {
  return await User.findById(id)
}

module.exports = { login, register, logout, current }
