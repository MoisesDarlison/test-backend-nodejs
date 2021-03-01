const express = require('express');
require('dotenv').config();
const app = express();
const { PORT = 3333 } = process.env
app.use(express.json());

const routeProduct = require('./routers/product')

app.use('/product', routeProduct)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`);
})

