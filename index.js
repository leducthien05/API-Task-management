const express = require("express");
const dotenv = require("dotenv").config();
const database = require("./config/database");
const app = express();
const port = process.env.PORT;

// connect
database.connect();
// router
const router = require("./API/v1/router/index.router");
router(app);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});