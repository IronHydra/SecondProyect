const express = require("express");
const router = require("express").Router();
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
      console.log(artist)
      res.render("artist", {
        artist: artist
      })
    });
});

router.get("/artists", (req, res, next) => {
  var content = [];
  console.log('apiArtist-list');
  for (var i = 0; i < 10; i++){
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
        name: req.params.name
      })
      .getResource(function(error, artist) {
        console.log(artist)
        content.push(artist.name);
      });
  }
  console.log(content)
  res.render("artists", {artists: content})
});



router.get("/example",(req,res,next)=>{
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
    .getResource(function(error, artist){
      console.log(artist._embedded.results[4]);
    });
});

module.exports = router;
