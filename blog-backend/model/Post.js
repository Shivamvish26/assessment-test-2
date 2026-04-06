const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title:String,
    content:String,
    image:String,
    author:String,
    status:{
        type:String,
        enum:["draft","published"], //enum to restrict the status to either "draft" or "published"
        default:"draft"
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
