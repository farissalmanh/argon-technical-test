const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const express = require("express");
const httpStatus = require('http-status');

const routes = require("./routes");
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require("./utils/ApiError");

const app = express();

require("dotenv").config();

const corsConfig = {
  origin: [`http://${process.env.CLIENT_EMPLOYEE}`, `http://${process.env.CLIENT_ADMIN}`],
  credentials: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());
app.use(compression());
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/attendance", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
