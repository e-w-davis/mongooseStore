const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true ,
    description: String,
    img: String,
    price: { type: Number, 
        // https://javascript.plainenglish.io/store-clean-data-by-validating-models-with-mongoose-f6453dbdbff9
        required: [ true, 'Quantity required'],
        min: [0, 'Minimum quantity is zero'], 
    },
    qty: { type: Number, 
        required: [ true, 'Quantity required'],
        min: [0, 'Minimum quantity is zero'], 
    },
}});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;