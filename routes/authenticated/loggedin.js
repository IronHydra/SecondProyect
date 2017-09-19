const User = require("../../models/User");
const router = require("express").Router();

router.get("/dashboard", (req, res, next)=>{
  res.render("loggedin/dashboard");
})

router.get("/profile", (req, res, next)=>{
  console.log('eso vale'+req.user);
  res.render("loggedin/profile" , {user : req.user})
});

router.get("/profile/edit", (req, res, next)=>{
  res.render("loggedin/profile-edit", {user : req.user})
})

router.post('/:id/profile/edit', (req, res, next) => {
  const profileId = req.params.id;

  const updates = {
        name: req.body.name,
        password: req.body.password,
        description: req.body.description
  };

  User.findByIdAndUpdate(profileId, updates, (err) => {
    if (err){ return next(err); }
    return res.redirect("/profile");
  });
});

module.exports = router;
