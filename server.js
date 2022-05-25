// require dependencies in our file

const express = require("express");
const Products = require('./models/products.js');
const app = express();
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
const productsSeed = require('./models/productsSeed.js');

app.get('/products/seed', (req, res) => {
    // Products.deleteMany({}, (error, allProducts) => {});

    Products.create(productsSeed, (error, data) => {
        res.redirect('/products');
    });
});

// mount our routes

//I(ndex)
app.get('/products', (req, res) => {
    Products.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

//N(ew)
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//D(elete)

//U(pdate)

//C(reate)
app.post('/products', (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }
    
    Products.create(req.body, (error, createdBook) => {
        res.redirect('/products');
    });
});

//E(dit)

//S(how)
app.get('/products/:id', (req, res) => {
    Products.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

// tell application to listen for requests
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
