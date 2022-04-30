const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const { NotAuthorizedError, RegistrationError, NotFoundError } = require('../helpers/errors')

const { User } = require('../schemas')

const updateToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) return null

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)

  await updateToken(user.id, token)

  return token
}

const register = async user => {
  if (await User.findOne({ email: user.email })) {
    throw new RegistrationError('Email in use')
  }

  const newUser = await User(user)
  return await newUser.save()
}

const logout = async _id => {
  return await User.updateOne({ _id }, { token: null })
}

const current = async id => {
  return await User.findById(id)
}

module.exports = { login, register, logout, current }
