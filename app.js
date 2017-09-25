
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const multer = require("multer")
const {dbURL} = require('./config/db');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const index = require('./routes/index');
const authRoutes = require('./routes/auth/auth');
const loggedRoutes = require('./routes/authenticated/dashboard');
const apiArtist = require("./routes/authenticated/artist");
const apiShows = require("./routes/authenticated/shows");
const apiArtworks = require("./routes/authenticated/artworks");


const debug = require('debug')("app:"+path.basename(__filename).split('.')[0]);

const mongoose = require("mongoose");
mongoose.connect(dbURL,{useMongoClient:true})
        .then(()=> debug("connected to db!"));

var app = express();
var requested = 0;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout");
app.use(expressLayouts);

app.use(flash());

app.use((req, res, next) => {
  res.locals.title = "Virtual Museum";
  next();
});

app.use(
  session({
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);

require("./passport/serializers");
require("./passport/local");
require("./passport/facebook");

app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", loggedRoutes);
app.use("/", authRoutes);
app.use("/", apiArtist);
app.use("/", apiShows);
app.use("/", apiArtworks);
app.get("/", (req, res) => res.render("index", { user: req.user }));



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
