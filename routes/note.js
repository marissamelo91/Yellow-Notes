const express = require("express");
const { readFile } = require("node:fs/promises");
const fs = require("fs");
const note = express.Router();
const file = "./db/db.json";

note.get("/", async (req, res) => {
   const data = await getData()

    res.json(JSON.parse(data));
});

const getData = async () =>{
    const data = await readFile(file, {encoding: "utf8"});
    console.log(data);
    return data;
}

module.exports = note;