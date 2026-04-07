const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: String, // user id
  postId: String, //post id store karna hai like ke liye
});

// unique index create karna hai user aur postId ke combination
// par taki ek user ek post ko sirf ek baar like kar sake
likeSchema.index(
  {
    user: 1,
    postId: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("Like", likeSchema);
