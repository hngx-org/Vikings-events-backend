const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
// const dotenv = require('dotenv');

// import middlewares
const { notFound, errorHandler } = require('./middlewares/error');

// import routes
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const groupRoutes = require('./routes/group');
const { authRoutes } = require('./routes');
const commentRoutes = require('./routes/comment');

// dotenv.config()

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieSession({ httpOnly: true, keys: process.env.JWT_KEY }));

app.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/comments', commentRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = { app };
