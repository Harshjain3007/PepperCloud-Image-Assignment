const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer")
const route = require("./routes/route");
const app = express();

app.use(express.json())
app.use(multer().any())

mongoose.set('strictQuery', true)

mongoose
  .connect(
    "mongodb+srv://HarshJain:harsh321@cluster0.dwkz9.mongodb.net/Image-db")
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000))
})