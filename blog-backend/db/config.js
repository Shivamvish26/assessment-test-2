const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Blog")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.error("MongoDB Connection Failed:", error));
