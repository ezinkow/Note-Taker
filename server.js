const express = require("express");
const path = require("path");
const fs = require("fs");
const { constants } = require("buffer");
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allNotes = [{
    noteTitle: "test title",
        note: "test note",
}]

app.get("/api/notes", function (req, res) {
    var notes = req.params.note;
    console.log(notes)

    return res.json(allNotes)
})

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/notes.html")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/api/notes", function(req, res) {
    var newNote = req.body
    console.log(newNote)
    allNotes.push(newNote)
    res.json(allNotes)
})

function writeNote(req, res) {
    const jsonString = JSON.stringify(allNotes)
    fs.writeFile('./db/db.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    fs.readFile(__dirname + "./db/db.json", (err, jsonString) => {
      if (err) throw err;
      console.log("data", jsonString)
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.end(data);
    });
  }
  
  var server = http.createServer(writeNote);











app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
  });