const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

// import middlewares
const { notFound, errorHandler } = require('./middlewares/error')

// // import routes
const { eventRoutes, userRoutes, groupRoutes } = require('./routes/index.js')

// import DB Models
const User = require('./models/user.js')
const Event = require('./models/event.js')
const Group = require('./models/group.js')
const Comment = require('./models/comment.js')
const Image = require('./models/image.js')

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

Event.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Event)

// Interested Events Relationship
Event.belongsToMany(User, { through: 'interested_event' })
User.belongsToMany(Event, { through: 'interested_event' })

// User Group Relationship
User.belongsToMany(Group, { through: 'user_groups' })
Group.belongsToMany(User, { through: 'user_groups' })

// Group Event Relationship
Group.belongsToMany(Event, { through: 'group_events' })
Event.belongsToMany(Group, { through: 'group_events' })

// Comment, Event and User RelationShip
Comment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
Comment.belongsTo(Event, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Comment)
Event.hasMany(Comment)

// Image Comment RelationShip
Comment.belongsTo(Image, { constraints: true, onDelete: 'CASCADE' })
Image.hasMany(Comment)

module.exports = app
