const authService = require('../services/authService')

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)

    if (!user) return res.status(200).json({ status: 'fail', error: 'Email already in use' })

    return res.status(200).json({ status: 'success', user })
  } catch (error) {
    next(error)
  }
}

module.exports = { register }
