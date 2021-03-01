const connection = require('../config/database/connection');

const CategorySchema = connection.Schema({
    category: {
        type: String,
    },
    product: {
        type: connection.Schema.Types.ObjectId,
        ref: 'products'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = connection.model('categories', CategorySchema);

module.exports = Category;