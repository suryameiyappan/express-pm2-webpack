"use strict";
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const cookieParser = require("cookie-parser");
const rfs = require("rotating-file-stream");
const utils = require("./utils/index");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const myCronJob = require("./cron-jobs/myCronJob");
const morgan = require("morgan");

const app = express();

// myCronJob.start();

// view engine setup
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use((req, res, next) => {
  res.locals.utils = utils;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render("404");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
