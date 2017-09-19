const Artist = require("../../models/Artist")
const router = require("express").Router();

router.get("/artists/:id", (req, res, next)=>{
  res.render("artist-page", {artist: req.artist})
})

module.exports = Router;
