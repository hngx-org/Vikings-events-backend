const syncDBRelations = require('../dbRelations/syncDBRelations');
const { app } = require('./app');
const sequelize = require('./config/config');

const port = process.env.PORT || 5000;

// Register all the relationship accross all models
syncDBRelations();

// connect to the database
sequelize.sync({ force: false }).then(() => {
  console.log(
    'Database connection has been established and relations have been initialized successfully.',
  );
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
});
