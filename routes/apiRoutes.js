var path = require("path")
var noteData = require("../db/db.json")
const fs = require("fs")
// const { v4: uuidv4 } = require('uuid');


module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        // var notes = req.params.note;
        // console.log(notes)
    
        return res.json(noteData)
    })

    app.post("/api/notes", function(req, res) {
        var newNote = {
                id:noteData.length,
                title:req.body.title,
                text:req.body.text
            }
            console.log(newNote)
        noteData.push(newNote)
        res.json(noteData)
        // console.log(noteData)
    })

    // var removeByAttr = function(arr, attr, value){
    //     var i = noteData.length;
    //     while(i--){
    //        if( noteData[i] 
    //            && noteData[i].hasOwnProperty(attr) 
    //            && (arguments.length > 2 && noteData[i][attr] === value ) ){ 
    
    //            noteData.splice(i,1);
    
    //        }
    //     }
    //     return noteData;
    // }

    app.delete("/api/notes/:id", function (req, res) {
        var entryId = req.params.id
        console.log("entryid", entryId)
        for (var i = 0; i < noteData.length; i++) {
            if (noteData[i].id === entryId) {
                console.log("notedata", noteData)
                // console.log(noteData[i].id)
                var findIndex = noteData.indexOf(entryId)
                console.log("findid", findIndex)
                noteData.splice(findIndex, 1)
                return res.json(noteData)
            }
        }
    })

}