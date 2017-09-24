const express = require("express");
const router = require("express").Router();
const User = require("../../models/User.js");
var traverson = require("traverson"),
  JsonHalAdapter = require("traverson-hal"),
  xappToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUwNjU4MzA3MiwiaWF0IjoxNTA1OTc4MjcyLCJhdWQiOiI1OWJmY2UyMDc2MjJkZDRkNmQ2YzRlZDYiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNTljMzY3YTAyNzViMjQ3YTUzYjM1MDgzIn0.TPuyJ79u2DIBTr7twSthm_v7W6_L3XsYeuEbAaWd2-k";

traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
api = traverson.from("https://api.artsy.net/api").jsonHal();

router.get("/artist/:id", (req, res, next) => {
  console.log('entro a apiArtist');
  api
    .newRequest()
    .follow("artist")
    .withRequestOptions({
      headers: {
        "X-Xapp-Token": xappToken,
        Accept: "application/vnd.artsy-v2+json"
      }
    })
    .withTemplateParameters({
      id: req.params.id
    })
    .getResource(function(error, artist) {
      console.log(artist.name)
      res.render("artist", {
        artist: artist
      })
    });
});

router.post("/saveArtist", (req, res, next)=>{
  let artistName = Object.values(req.body)[4];
  req.user.favouriteArtists.push(artistName);
  console.log(req.user)
  User.findByIdAndUpdate(req.user.id, req.user)
  .then(() => res.redirect("/dashboard"))
  .catch(err => console.log(err))
})

router.get("/search",(req,res,next)=>{
  api2 = traverson.from(`https://api.artsy.net/api/search?q=${req.query.search}`).jsonHal();
  console.log(req.query.search);
  api2
    .newRequest()
    .withRequestOptions({
      headers: {
        "X-Xapp-Token": xappToken,
        Accept: "application/vnd.artsy-v2+json"
      }
    })
    .withTemplateParameters({
      name: ""
    })
    .getResource(function(error, result){
      console.log(Object.values(result._embedded.results[0]._links.permalink)[0]);
      console.log(result._embedded.results[0].title_links);
      res.render("search", {
        results: result._embedded.results
      });
    });
});

module.exports = router;
