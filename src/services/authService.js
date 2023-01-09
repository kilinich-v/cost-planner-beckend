const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const { ValidationError, RegistrationError } = require('../helpers/errors')

const { User } = require('../schemas')

const updateToken = async (id, token) => {
  await User.findByIdAndUpdate(id, { $set: { token } }, { new: true })
}

const login = async ({ email, password }) => {
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ValidationError('Email or password is wrong')
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)

  await updateToken(user.id, token)

  return token
}

const register = async user => {
  if (await User.findOne({ email: user.email })) {
    throw new RegistrationError('Email in use')
  }

  const newUser = await User(user)
  await newUser.save()

  return newUser.normalize()
}

const logout = async _id => {
  return await User.updateOne({ _id }, { token: null })
}

const current = async id => {
  const user = await User.findById(id)

  return user.normalize()
}

module.exports = { login, register, logout, current }
