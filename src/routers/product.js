const express = require('express');
const routes = express();
const productController = require('../controllers/productController')

routes.post('/', productController.create);
routes.get('/', productController.index);
routes.get('/list', productController.filter);
routes.delete('/:title', productController.destroy);
routes.put('/:title', productController.upadate)

module.exports = routes;

