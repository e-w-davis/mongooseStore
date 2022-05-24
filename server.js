// require dependencies in our file

const express = require("express");
const app = express();
const Product = require('./models/products');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// mount our middleware
app.use(express.urlencoded({ extended: true }));

// Seed
const productSeed = require('./models/productsSeed.js');

app.get('/products/seed', (req, res) => {
    Product.deleteMany({}, (error, allProducts) => {});

    Product.create(productSeed, (error, data) => {
        res.redirect("/products");
    });
});

// mount our routes

//I(ndex)
app.get('/products', (req, res) => {
    res.render('index.ejs', {
        products: allProducts,
    });
});

//N(ew)

//D(elete)

//U(pdate)

//C(reate)

//E(dit)

//S(how)

// tell application to listen for requests
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

// git add .
// git commit -m "Basic setup"
// git push -u origin master
