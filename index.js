const express = require("express")
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require("cors");

app.use(cors());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(()=>{
        app.listen(3000)
        console.log('listening...');
});

app.get("/",(req,res)=>{
    res.send({msg:"Hello world"})
})