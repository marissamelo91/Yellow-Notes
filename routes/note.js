//sets up an Express router and prepares to read data from a JSON file
const { readFile } = require("node:fs/promises");
const express = require("express");
const fs = require("fs");
const note = express.Router();
const file = "./db/db.json";
let data = "";

//gets a route for the root URL and sends the result to a JSON response.
note.get("/", async (req, res) => {
    data = await getData();
    res.json(JSON.parse(data));
});

note.post("/", (req, res) => {
    //create a new note object from the request body
    let newNote = req.body;
    //parse the original data from a string to a JSON object
    const newData = JSON.parse(data);
    //assign a new ID to the new note
    newNote.id = getNewId();
    //add the new note to the original data
    newData.push(newNote);
    //convert the data back to a string
    data = JSON.stringify(newData);
    //save the new data
    saveNewNote(data);
    //return the new note as a JSON reponse
    res.json(newNote);

});
//delete endpoint to remove a note by its ID
note.delete("/:id", (req, res) => {
    //get current data and extract "id"
    const currentData = JSON.parse(data);
    const id = req.params.id;
    //filter method to create a new array, "newData", except the one with the "id"
    const newData = currentData.filter(data => data.id !== id);
    //converted back into JSON String
    data = JSON.stringify(newData);
    //data passed to saveNewNote function
    saveNewNote(data);
    //router handler sends a reponse to the client containing a message
    res.json("data is removed");

})
//getData function read and returns data
const getData = async () => {
    const data = await readFile(file, { encoding: "utf8" });
    return data;
}

//write data into file and pass three arguments 
//error message will occur if bug occurs
const saveNewNote = async (data) => {
    await fs.writeFile(file, data, error => {
        if (error) {
            console.log("error occurs in writing file")
        }
            console.log("new data is saved")

    })
}

//delete button function 
const getNewId = () => {
    const id = Math.floor((Math.random() * 9000) + 1000);
    return `${id}`;
}

module.exports = note;