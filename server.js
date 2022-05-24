// require dependencies in our file

const express = require("express");
const app = express();
const product = require('./models/products');
require('dotenv').config();
const PORT = process.env.PORT;



// initialize express framework



// configure application settings


// mount our middleware



// mount our routes

//I(ndex)

//N(ew)

//D(elete)

//U(pdate)

//C(reate)

//E(dit)

//S(how)

// tell application to listen for requests

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

// git add .
// git commit -m "Basic setup"
// git push -u origin master
