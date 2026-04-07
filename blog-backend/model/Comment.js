const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: String,
    user: String,
    post: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", commentSchema);
