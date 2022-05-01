const { authService } = require('../services')

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)

    return res.status(200).json({ status: 'success', user })
  } catch (error) {
    return res.status(error.status).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const token = await authService.login(req.body)

    if (!token) return res.status(200).json({ status: 'fail', error: 'Email or password is wrong' })

    return res.status(200).json({ status: 'success', token })
  } catch (error) {
    return res.status(error.status).json({ error: error.message })
  }
}

const logout = async (req, res) => {
  try {
    await authService.logout(req.user.id)

    return res.status(200).json({ status: 'success' })
  } catch (error) {
    return res.status(error.status).json({ error: error.message })
  }
}

const current = async (req, res) => {
  try {
    const user = await authService.current(req.user.id)

    if (user) return res.status(200).json({ status: 'success', data: user })
  } catch (error) {
    return res.status(error.status).json({ error: error.message })
  }
}

module.exports = { register, login, logout, current }
