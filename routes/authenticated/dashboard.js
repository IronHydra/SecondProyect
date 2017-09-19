const User = require("../../models/User");
const router = require("express").Router();

router.get("/dashboard", (req, res, next)=>{
  res.render("dashboard/dashboard");
})

router.get("/profile", (req, res, next)=>{
  res.render("dashboard/profile" , {user : req.user})
});

router.get("/profile/edit", (req, res, next)=>{
  res.render("dashboard/profile-edit", {user : req.user})
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
