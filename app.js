const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminrouter = require("./router/admin");
const path = require("path");
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", "./views");

app.use(express.static(path.join(__dirname, "/public")));

app.use(adminrouter);

mongoose
  .connect(
    "mongodb+srv://prashant:prashant@cluster0mar2023.iwxf1zf.mongodb.net/test"
  )
  .then((result) => {
    console.log("connected with the database");

    app.listen(3000, function () {
      console.log("the server is live");
    });
  })
  .catch((err) => {
    console.log("met with an error!");
  });
