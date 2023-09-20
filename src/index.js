const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()


// import routes
const eventRoutes = require('./routes/event.js')
const userRoutes = require('./routes/user.js')
const groupRoutes = require('./routes/group.js')


// import middlewares
const { notFound, errorHandler } = require('./middlewares/error.js')


const port = process.env.PORT || 5000

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

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`)
  /* eslint-enable no-console */
})
