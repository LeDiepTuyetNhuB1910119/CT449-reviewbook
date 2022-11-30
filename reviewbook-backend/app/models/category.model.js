const mongoose = require("mongoose");
const { Schema } = mongoose;

const category = new Schema({
  categoryName: String,
});

module.exports = mongoose.model("Category", category);
