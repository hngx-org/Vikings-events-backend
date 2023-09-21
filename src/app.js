import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

// import middlewares
import { errorHandler, notFound } from './middlewares/error.js'

// import routes
import { eventRoutes, userRoutes, groupRoutes } from './routes/index.js'

dotenv.config()

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

export default app
