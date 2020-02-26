var express = require("express");
var path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//html routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//api routes
db = require("./db/db.json");
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
app.post("/api/notes", function (req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let newData = JSON.parse(data);
        newData.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            res.send('Posted')
        })
    });
});
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let newData = JSON.parse(data);
        newData.splice(req.params.id, 1)
        fs.writeFile("./db/db.json", JSON.stringify(newData), (err) => {
            if (err) throw err;
            res.send('Deleted')
        })
    })
});

//server listening 
app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
});