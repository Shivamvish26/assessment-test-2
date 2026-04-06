const express = require("express");
const app = express();
const User = require("./model/User");
const { asyncWrapProviders } = require("node:async_hooks");

// db connection
require("./db/config");

//middleware
app.use(express.json());

//register route
// app.post("/register", async (req, resp) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   resp.send(result);
// });

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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
