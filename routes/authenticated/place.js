const express = require("express");
const rest = require("restler");
const router = require("express").Router();

router.get("/info/place/:id", (req, res, next) => {
  rest
    .get("http://api.harvardartmuseums.org/place/" + req.params.id, {
      query: {
        apikey: "ddec7b50-9d65-11e7-aa1e-b1f670c2f306",
      }
    })
    .on("complete", function(data, response) {
      console.log(data);
      res.render("place", { place: data });
    });
});

module.exports = router;
