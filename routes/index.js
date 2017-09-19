var express = require("express");
var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get('/', (req,res) => {
  console.log(req.user);
  res.render('index',{user:req.user})
=======
router.get("/", function(req, res, next) {
  res.render("index", { title: "Virtual Museum" });
>>>>>>> e6744244d790da6f3b924479029677ab85115fd0
});
module.exports = router;
