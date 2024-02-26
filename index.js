var express = require("express"),
  app = express(),
  path = require("path"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local");

mongoose.connect("mongodb://localhost/login_info");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  require("express-session")({
    secret: "once again sonal win",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
  res.render("landing");
});

app.post("/", function (req, res) {
  res.send("Signing you up");
});

app.get("/signin", function (req, res) {
  res.render("signin");
});
app.listen(3000, function () {
  console.log("The server has started.");
});
