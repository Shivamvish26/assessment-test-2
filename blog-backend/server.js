const express = require("express");
const app = express();
const User = require("./model/User");
const Post = require("./model/Post");
const Like = require("./model/Likes");
const Comment = require("./model/Comment");
const cors = require("cors");
const multer = require("multer")

// db connection
require("./db/config");

//middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use("/upload", express.static("upload"));

// folder create karna
const upload = multer({
  dest:"upload/"
})

//Cehcking route
// app.post("/sample",(req,resp)=>{
//   resp.send("Sample Post API is working");
// })

// register api
app.post("/register", async (req, resp) => {
  let existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return resp.send({ message: "Email already registered" });
  }
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send({ message: "User registered successfully", user: result });
});

// --------------------------------------------------------------------------------------------

//login api
app.post("/login", async (req, resp) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email && password) {
    let user = await User.findOne({ email, password }).select("-password");
    if (user) {
      resp.send({
        message: "Login successful",
        user: user,
      });
    } else {
      resp.status(401).send({ message: "No User Found" });
    }
  } else {
    resp.status(400).send({ message: "Email and Password required" });
  }
});

// -----------------------------------------------------------------------------------------------

// Create Post API
// app.post("/create", async (req, resp) => {
//   const post = new Post(req.body);
//   const result = await post.save();
//   resp.send({
//     message: "Post Created Successfully",
//     post: result,
//   });
// });

app.post("/create", upload.single("image"), async (req, resp) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    status: req.body.status,
  image: req.file ? req.file.filename : ""
  });

  const result = await post.save();

  resp.send({
    message: "Post Created Successfully",
    post: result,
  });
});

// ----------------------------------------------------------------------------------------------

// get all post api (home page api sirf published data)
app.get("/get-post", async (req, resp) => {
  const posts = await Post.find({ status: "published" });
  resp.send({
    message: "All Published Posts",
    posts: posts,
  });
});

// ----------------------------------------------------------------------------------------------

// get all post api for author as well as for the draf and published post
app.get("/my-posts/:author", async (req, resp) => {
  const posts = await Post.find({
    author: req.params.author,
  });

  resp.send({
    message: "All user posts",
    posts: posts,
  });
});

// -----------------------------------------------------------------------------------------------

// get single post api
app.get("/:id", async (req, resp) => {
  const post = await Post.findById(req.params.id);
  resp.send({
    message: "Post found",
    post: post,
  });
});

// -----------------------------------------------------------------------------------------------

// update post api
// app.put("/:id", async (req, resp) => {
//   const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   if (!post) {
//     return resp.status(404).send({ message: "Post not found" });
//   }
//   resp.send({
//     message: "Post updated successfully",
//     post: post,
//   });
// });

app.put("/edit-post/:id", upload.single("image"), async (req, resp) => {
  let updateData = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    status: req.body.status,
  };
  if (req.file) {
    updateData.image = req.file.filename;
  }
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );
  if (!post) {
    return resp.status(404).send({ message: "Post not found" });
  }
  resp.send({
    message: "Post updated successfully",
    post,
  });
});

// -----------------------------------------------------------------------------------------------

// Delete post api
app.delete("/:id", async (req, resp) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return resp.status(404).send({ message: "Post not found" });
  }

  resp.send({
    message: "Post deleted successfully",
  });
});
// -----------------------------------------------------------------------------------------------

// Get user drafts
// app.get("/drafts/:author", async (req, resp) => {
//   const drafts = await Post.find({
//     author: req.params.author,
//     status: "draft",
//   });
//   resp.send({
//     message: "Drafts found",
//     drafts: drafts,
//   });
// });

// -----------------------------------------------------------------------------------------------

// like and unlike post api
app.post("/api/like/:postId", async (req, resp) => {
  const { user } = req.body;
  const { postId } = req.params;
  const existing = await Like.findOne({ user, post: postId });
  if (existing) {
    await Like.deleteOne({ _id: existing._id });
    return resp.send({
      message: "Post unliked successfully",
    });
  } else {
    await Like.create({ user, post: postId });
    return resp.send({
      message: "Post liked successfully",
    });
  }
});

// -----------------------------------------------------------------------------------------------

// Total Count of like for a post
app.get("/api/count/:postId", async (req, resp) => {
  console.log("Post ID:", req.params.postId);
  const count = await Like.countDocuments({
    post: req.params.postId,
  });
  console.log("Count:", count);
  resp.send({
    message: "Total likes for the post",
    count: count,
  });
});

// -----------------------------------------------------------------------------------------------

// Comment on post api
app.post("/api/comment/:postId", async (req, resp) => {
  const { user, text } = req.body;
  const { postId } = req.params;
  if (!user || !text) {
    return resp.send({ message: "User and text required" });
  }
  const comment = new Comment({
    user,
    text,
    post: postId,
  });
  const result = await comment.save();
  resp.send({
    message: "Comment added successfully",
    comment: result,
  });
});

// -----------------------------------------------------------------------------------------------

// get all comments for a post api

app.get("/api/comment/:postId", async (req, resp) => {
  const comments = await Comment.find({
    post: req.params.postId,
  });
  resp.send({
    message: "Comments for the post",
    comments: comments,
  });
});

// -----------------------------------------------------------------------------------------------

// search api and pagination api

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
