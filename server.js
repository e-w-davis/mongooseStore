const express = require("express");
const Product = require("./models/products.js");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require("method-override")

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
app.use(methodOverride("_method"));

// Seed
const productsSeed = require('./models/productsSeed');


app.get('/products/seed', (req, res) => {
    // Products.deleteMany({}, (error, allProducts) => {});

    Product.create(productsSeed, (error, data) => {
        res.redirect('/products');
    });
});

// mount our routes

//I(ndex)
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            product: allProducts,
        });
    });
});

//N(ew)
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//D(elete)
app.delete("/products/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/products")
    })
})

//U(pdate)
app.put("/products/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`)
        }
    )
})

//C(reate)
app.post('/products', (req, res) => {  
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});

//E(dit)
    app.get("/products/:id/edit", (req, res) => {
        Product.findById(req.params.id, (error, foundProduct) => {
            res.render("edit.ejs", {
                product: foundProduct,
        })
    })
})

//S(how)
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
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
