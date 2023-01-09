const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

require('dotenv').config()

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
})

userSchema.method('normalize', function () {
  const user = this.toObject()
  user.id = user._id
  delete user._id
  delete user.__v
  delete user.password

  return user
})

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)

    this.token = jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY)
  }

  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
