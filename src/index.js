const app = require('./app.js')
const sequelize = require('./utils/database')

const port = process.env.PORT || 5000

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`)
      /* eslint-enable no-console */
    })
  })
  .catch((err) => {
    console.log(err)
  })
