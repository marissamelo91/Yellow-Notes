const express = require('express');
const app = express ();
const notes = require ("./routes/note");


//Middleware functions, except 10-12
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/api/notes", notes);
const PORT = process.env.PORT || 3000;
app.listen (PORT,() =>{
    console.log(`listening on http://127.0.0.1:${PORT}`)

})