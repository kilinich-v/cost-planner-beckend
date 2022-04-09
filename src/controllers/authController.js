const { authService } = require('../services')

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)

    if (!user) return res.status(200).json({ status: 'fail', error: 'Email already in use' })

    return res.status(200).json({ status: 'success', user })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body)

    if (!token) return res.status(200).json({ status: 'fail', error: 'Email or password is wrong' })

    return res.status(200).json({ status: 'success', token })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.body.id)

    return res.status(200).json({ status: 'success' })
  } catch (error) {
    next(error)
  }
}

const current = async (req, res, next) => {
  try {
    const user = await authService.current(req.body.id)

    if (user) return res.status(200).json({ status: 'success', data: user })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, logout, current }
