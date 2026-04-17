const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const database = require("./config/database");
const app = express();
const port = process.env.PORT;
// cors
app.use(cors);
// connect
database.connect();
// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// router
const router = require("./API/v1/router/index.router");
router(app);

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});