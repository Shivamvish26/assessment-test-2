const express = require("express");
const app = express();
const User = require("./model/User");
const Post = require("./model/Post")

// db connection
require("./db/config");

//middleware
app.use(express.json());

//Cehcking route
// app.post("/sample",(req,resp)=>{
//   resp.send("Sample Post API is working");
// })

// register api
app.post("/register", async (req, resp) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject(); // Convert the Mongoose document to a plain JavaScript object
    delete result.password; // Remove the password field from the result before sending the response
    resp.send({ message: "User registered successfully", user: result });
  } catch (err) {
    resp.status(500).send({ message: "Error in registering user" });
  }
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
app.post("/create", async (req,resp)=>{
  const post = new Post(req.body);
  const result = await post.save();
  resp.send({
    message:"Post Created Successfully",
    post:result
  });
})

// ----------------------------------------------------------------------------------------------

// get all post api
app.get("/", async (req,resp)=>{
  const posts = await Post.find({status:"published"})
  resp.send({
    message:"All Published Posts",
    posts:posts
  })
})

// -----------------------------------------------------------------------------------------------


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
