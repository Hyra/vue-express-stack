require("dotenv").config();

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var sassMiddleware = require("node-sass-middleware");

import db from "./models";

const { ApolloServer } = require("apollo-server-express");

import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";

var index = require("./routes/index");
var users = require("./routes/users");

var app = express();

import schema from "./schema";
import resolvers from "./resolvers";
console.log("SECRET", process.env.SECRET);
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    db,
    secret: process.env.SECRET
  }
});
server.applyMiddleware({ app, path: "/graphql" });

// app.use(postgraphql("postgres://localhost:5432", "public", { graphiql: true }));

db.sequelize.sync().then(() => {
  console.log("synced");
  // populate author table with dummy data
  // db.author.bulkCreate(
  //   times(10, () => ({
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName()
  //   }))
  // );
  // // populate post table with dummy data
  // db.post.bulkCreate(
  //   times(10, () => ({
  //     title: faker.lorem.sentence(),
  //     content: faker.lorem.paragraph(),
  //     authorId: random(1, 10)
  //   }))
  // );
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
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
