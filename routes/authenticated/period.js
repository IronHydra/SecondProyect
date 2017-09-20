const express = require("express");
const rest = require("restler");
const router = require("express").Router();

router.get("/info/period/:id", (req, res, next) => {
  rest
    .get("http://api.harvardartmuseums.org/period/" + req.params.id, {
      query: {
        apikey: "ddec7b50-9d65-11e7-aa1e-b1f670c2f306",
      }
    })
    .on("complete", function(data, response) {
      console.log(data);
      res.render("period", {period : data})
    });
});

// // Find all of the objects with the word "dog" in the title and return only a few fields per record
// rest.get("http://api.harvardartmuseums.org/culture", {
//     query: {
//         apikey: "ddec7b50-9d65-11e7-aa1e-b1f670c2f306",
//         fields: "title,dated",
//     }
// }).on("complete", function(data, response) {
//     console.log(data);
// });

module.exports = router;