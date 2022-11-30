const mongoose = require("mongoose");
const { Schema } = mongoose;

const review = new Schema({
  book: String,
  content: String,
  author: String,
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Review", review);
