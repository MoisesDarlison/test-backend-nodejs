const connection = require('../config/database/connection');

const ProductSchema = connection.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = connection.model('products', ProductSchema);

module.exports = Product;