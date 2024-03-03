var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    indexRoutes = require("./routes/index")

mongoose.connect("mongodb://127.0.0.1:27017/facebook",
 { useUnifiedTopology: true, useNewUrlParser: true })
app.use(bodyParser.urlencoded({extended:true})); 
app.set("view engine" ,"ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

app.use(require("express-session")({
    secret:"Dugu is the cutuest dog in the world",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success= req.flash("success");
    next();
});

app.use("/",indexRoutes);

app.listen(3000,function(){
    console.log("The server started");
});