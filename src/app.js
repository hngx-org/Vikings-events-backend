const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./utils/passport')(passport);
// const dotenv = require('dotenv');

// import middlewares
const { notFound, errorHandler } = require('./middlewares/error');

// import routes
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const groupRoutes = require('./routes/group');

// dotenv.config()

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

// express session
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
