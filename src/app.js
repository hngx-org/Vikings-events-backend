const express  = require('express')
const morgan  = require('morgan')
const cors  = require('cors')

require('dotenv').config()

// import middlewares
const { notFound, errorHandler } = require('./middlewares/error.js')

// import routes
const { eventRoutes, userRoutes, groupRoutes } = require('./routes/index.js')

// dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  })
})

// Routes
app.use('/api/events', eventRoutes)
app.use('/api/users', userRoutes)
app.use('/api/groups', groupRoutes)

// Error Middlewares
app.use(notFound)
app.use(errorHandler)

module.exports = app
