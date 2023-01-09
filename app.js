const express = require('express')
const logger = require('morgan')

const { userRoutes, noteRoutes, resourceRoutes } = require('./src/routes')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.json({ limit: 10000 }))

app.use('/user', userRoutes)
app.use('/notes', noteRoutes)
app.use('/resources', resourceRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Wrong route' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
