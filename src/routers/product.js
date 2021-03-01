const express = require('express');
const routes = express();
const productController = require('../controllers/productController')

routes.post('/', productController.create);
routes.get('/', productController.index);
routes.get('/:product_id', productController.filter);
routes.delete('/:product_id', productController.destroy);
routes.put('/:product_id', productController.upadate)



module.exports = routes;

