const syncDBRelations = require('../dbRelations/syncDBRelations');
const { app } = require('./app');
const sequelize = require('./config/config');

const port = process.env.PORT || 5000;

// Register all the relationship accross all models
syncDBRelations();

// Removed the sync, there is no need to sync the database if we migration files
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
