const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  gender: String,
  biography: String,
  birthday: Date,
  deathday: Date,
  hometown: String,
  location: String,
  nationality: String,
  image: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const artist = mongoose.model("artist", artistSchema);

module.exports = Artist;
