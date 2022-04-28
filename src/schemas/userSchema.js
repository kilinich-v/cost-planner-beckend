const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
