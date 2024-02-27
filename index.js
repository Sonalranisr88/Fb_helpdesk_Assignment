var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

var app = express();
mongoose.connect("mongodb://localhost/login_info");
app.use(bodyParser.urlencoded({ extended: false }));
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
  res.render("signin");
});

app.post("/", function (req, res) {
  req.body.username;
  req.body.password;
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("signin");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/home");
      });
    }
  );
});

app.get("/signin", function (req, res) {
  res.render("signin");
});

app.get("/signout", function (req, res) {
  res.render("signout");
});

app.post("/signout", function (req, res) {
  res.render("signout/fb");
});

app.listen(3000, function () {
  console.log("The server has started.");
});
