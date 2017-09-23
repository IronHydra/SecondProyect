const User = require("../../models/User");
const router = require("express").Router();
const multer = require("multer")
const upload = multer({ dest: './public/images/' });

router.get("/dashboard", (req, res, next)=>{
  res.render("dashboard/dashboard");
})

router.get("/profile", (req, res, next)=>{
  res.render("dashboard/profile" , {user : req.user})
});

router.get("/profile-edit", (req, res, next)=>{
  res.render("dashboard/profile-edit", {user : req.user})
})

router.post('/:id/profile/edit', upload.single('image'), (req, res, next) => {
  const profileId = req.params.id;

  const updates = {
        name: req.body.name,
        password: req.body.password,
        description: req.body.description,
        image: `/images/${req.file.filename}`,
  };

  User.findByIdAndUpdate(profileId, updates, (err) => {
    if (err){ return next(err); }
    return res.redirect("/profile");
  });
});

module.exports = router;
