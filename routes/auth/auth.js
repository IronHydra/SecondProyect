
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require("path");
const passport = require("passport");
const debug = require("debug")("app:auth:local");

const router = require("express").Router();

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    console.log("user created ")

    const newUser = new User({
      username,
      password: hashPass,
      favouriteArtists: []
    })
      .save()
      .then( () => res.redirect("/login"))
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/logout',(req,res) =>{
  req.logout();
  res.redirect('/');
});

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}));

module.exports = router;
