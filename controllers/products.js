const express = require('express');
const Product = require('../models/products.js')
const router = express.Router();

// Seed
const productsSeed = require('../models/productsSeed');


router.get('/products/seed', (req, res) => {
    // Products.deleteMany({}, (error, allProducts) => {});

    Product.create(productsSeed, (error, data) => {
        res.redirect('/products');
    });
});

// mount our routes

//I(ndex)
router.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            product: allProducts,
        });
    });
});

//N(ew)
router.get('/products/new', (req, res) => {
    res.render('new.ejs');
});

//D(elete)
router.delete("/products/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/products")
    })
})

//U(pdate)
router.put("/products/:id", (req, res) => {
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
router.post('/products', (req, res) => {  
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});

//E(dit)
    router.get("/products/:id/edit", (req, res) => {
        Product.findById(req.params.id, (error, foundProduct) => {
            res.render("edit.ejs", {
                product: foundProduct,
        })
    })
})

//S(how)
router.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

module.exports = router;
