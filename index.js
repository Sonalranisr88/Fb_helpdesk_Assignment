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

// ROUTES=============================

app.get("/", function (req, res) {
  res.render("signin");
});

app.get("/home", isLoggedIn, function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  var newUser = new User({ username: req.body.email });
  User.register(newUser, req.body.pass);
  passport.authenticate("local");
  res.redirect("/home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res) {
  res.render("home");
});

// app.get("/signin", function (req, res) {
//   res.render("signin");
// });

// app.post(
//   "/signin",
//   passport.authenticate("local", {
//     successRedirect: "/home",
//     failureRedirect: "/login",
//   }),
//   function (req, res) {}
// );

app.get("/signout", function (req, res) {
  res.render("signout");
});

// app.get("/logout", (req, res) => {
//   req.logout(req.user, (err) => {
//     if (err) return next(err);
//     res.redirect("/");
//   });
// });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function () {
  console.log("The server has started.");
});
