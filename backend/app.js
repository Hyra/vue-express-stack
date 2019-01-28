require("dotenv").config();

import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
const fallback = require("express-history-api-fallback");

// var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var sassMiddleware = require("node-sass-middleware");

import db from "./models";

const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);
const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
});
// const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { ApolloServer } = require("apollo-server-express");
import jwt from "jsonwebtoken";

const getMe = async req => {
  const token = req.headers["authorization"];
  if (token) {
    try {
      return await jwt.verify(token.replace("Bearer ", ""), process.env.SECRET);
    } catch (e) {
      return "";
      // throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

import faker from "faker";
// import times from "lodash.times";
// import random from "lodash.random";

var index = require("./routes/index");
var users = require("./routes/users");

var app = express();
// var corsOptions = {
//   origin: function(req) {
//     console.log(req);
//     return req;
//   }, //"http://localhost:8080/",
//   credentials: true, // <-- REQUIRED backend setting,
//   preflightContinue: true
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // include before other routes
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(
  session({
    secret: "keep it secret, keep it safe.",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false
  })
);

import schema from "./schema";
import resolvers from "./resolvers";

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    // const fields =
    // error.extensions.exception.fields ||
    // error.extensions.exception.errors.path;
    // const fields = error.extensions.exception.errors.path;
    return {
      ...error,
      message
      // fields
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
        req,
        secret: process.env.SECRET
      };
    }
  }
});
apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

app.apolloServer = apolloServer;

db.sequelize.sync({ force: true }).then(async () => {
  // populate author table with dummy data

  const sensei = await db.user.create({
    // email: `sensei_${faker.internet.exampleEmail().toLowerCase()}`,
    email: `sensei@testdojo.nl`,
    password: "testtest"
  });

  const student1 = await db.user.create({
    email: `student1@testdojo.nl`,
    password: "testtest"
  });

  const student2 = await db.user.create({
    email: `student2@testdojo.nl`,
    password: "testtest"
  });

  const dojo = await db.dojo.create({
    title: `${faker.hacker.noun()} Dojo`,
    country: "Netherlands",
    handle: `testdojo`
  });

  // await dojo.addStudent(student1);
  // await dojo.addStudent(student2);
  // await dojo.addSensei(sensei);

  const profile = await db.profile.create({
    stripe_id: "123"
  });
  await profile.setDojo(dojo);
  await student1.addProfile(profile);

  const profile2 = await db.profile.create({
    stripe_id: "234"
  });
  await profile2.setDojo(dojo);
  await student2.addProfile(profile2);

  const profile3 = await db.profile.create({
    stripe_id: "456"
  });
  await profile3.setDojo(dojo);
  await sensei.addProfile(profile);

  // await student1.addDojo(dojo);
  // await student2.addDojo(dojo);
  // await sensei.addDojo(dojo);

  // const res = await db.dojo.findOne({
  //   // where: { "senseis.user.email": `sensei@something.nl` },
  //   include: [
  //     {
  //       model: db.user,
  //       as: "senseis",
  //       where: { email: "sensei@testdojo.nl" }
  //     }
  //   ]
  // });
  // console.log(res);

  // const senseis = await dojo.getSenseis();
  // console.log(senseis.length);
  // const students = await dojo.getStudents();
  // console.log(students.length);
  // db.author.bulkCreate(
  //   times(10, () => ({
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName()
  //   }))
  // );
  // populate post table with dummy data
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
