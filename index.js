const express = require("express");
const dotenv = require("dotenv").config();
const database = require("./config/database");
const app = express();
const port = process.env.PORT;

// connect
database.connect();

const Task = require("./model/task.model");
app.get("/tasks", async (req, res)=>{
    const task = await Task.find({
        deleted: false
    });
    console.log(task);
    res.json(task);
});
app.get("/tasks/detail/:id", async (req, res)=>{
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    console.log(task);
    res.json(task);
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});