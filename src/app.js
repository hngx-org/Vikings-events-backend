const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

// import middlewares
const { notFound, errorHandler } = require("./middlewares/error");

// import routes
const index = require("./routes/index");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(index);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
