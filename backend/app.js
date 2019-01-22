require("dotenv").config();

import express from "express";
import path from "path";
const fallback = require("express-history-api-fallback");

// var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var sassMiddleware = require("node-sass-middleware");

import db from "./models";

// const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { ApolloServer } = require("apollo-server-express");
import jwt from "jsonwebtoken";

const getMe = async req => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      return await jwt.verify(token.replace("Bearer ", ""), process.env.SECRET);
    } catch (e) {
      // throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";

var index = require("./routes/index");
var users = require("./routes/users");

var app = express();

import schema from "./schema";
import resolvers from "./resolvers";

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    const fields =
      error.extensions.exception.fields ||
      error.extensions.exception.errors.path;
    // const fields = error.extensions.exception.errors.path;
    return {
      ...error,
      message,
      fields
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        db
      };
    }
    if (req) {
      const me = await getMe(req);
      return {
        db,
        me,
        secret: process.env.SECRET
      };
    }
  }
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.apolloServer = apolloServer;

db.sequelize.sync({ force: true }).then(() => {
  // populate author table with dummy data
  db.author.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  );
  // populate post table with dummy data
  db.post.bulkCreate(
    times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 10)
    }))
  );
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/api/users", users);

app.use(express.static(path.join(__dirname, "./dist")));
app.use(fallback(path.join(__dirname, "./dist/index.html")));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
