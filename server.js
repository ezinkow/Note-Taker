const express = require("express");
const path = require("path");
const fs = require("fs");
const { constants } = require("buffer");
const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allNotes = [{
        id: "testtitle",
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
    newNote.id = newNote.noteTitle.replace(/\s+/g, "").toLowerCase();
    console.log(newNote)
    allNotes.push(newNote)
    res.json(allNotes)
})



function writeNote(req, res) {
    const jsonString = JSON.stringify(allNotes)
    fs.writeFile('/db.json', jsonString, err => {
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
  
//   var server = http.createServer(writeNote);


app.get("/api/notes/:id", function (req, res) {
        // return res.json(allNotes)
    app.delete("/api/notes/:id", function (req, res) {
        var urlID = req.params.id
        if (allNotes[0].id = urlID) {
            removeByAttr(allNotes, "id", urlID)
            return res.json(allNotes)}
        //     const jsonString = JSON.stringify(allNotes)
        // fs.writeFile('/db.json', jsonString, err => {
        //     if (err) {
        //         console.log('Error deleting note', err)
        //     } else {
        //         console.log('Successfully deleted note')
        //     }
        // })
        // }

    })
})






app.listen(PORT, function() {
    console.log("Server is listening on PORT: " + PORT);
  });