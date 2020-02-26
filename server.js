const express = require("express");
const fs = require("fs");
const path = require("path");

//Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

//Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//html routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Starts the server to begin listening 
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});