const mongooose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema ({
  title: String,
  category: String,
  medium: String,
  date: Number,
  image: String
})

const artwork = mongoose.model("artwork", artworkSchema);

module.exports = Artwork;
