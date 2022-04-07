const User = require('../schemas/userSchema')

const createUser = async body => {
  const user = await User({ ...body })
  return await user.save()
}

const findByEmail = async email => {
  const user = await User.findOne({ email })
  return user
}

const findById = async id => {
  return await User.findById(id)
}

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

module.exports = {
  createUser,
  findByEmail,
  updateToken,
  findById,
}
