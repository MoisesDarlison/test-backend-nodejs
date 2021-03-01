const productModel = require('../models/product')
const mongoose = require('mongoose')

module.exports = {
    async create(req, res) {
        const { title, description, price, category } = req.body;

        try {
            const productCreated = await productModel.create({
                title,
                description,
                price,
                category
            })

            return res.status(201).json({ productCreated })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async index(req, res) {
        try {
            const products = await productModel.find();

            return res.status(200).json({ products })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async filter(req, res) {
        const { product_id } = req.params;

        try {
            const productFilter = await productModel.findOne(
                {
                    _id: product_id
                });

            return res.status(200).json({ productFilter })

        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async destroy(req, res) {
        const { product_id } = req.params;

        try {
            const productDdelete = await productModel.findById(product_id)

            await productModel.deleteOne({ _id: product_id })

            return res.status(200).json({ Message: "Delete Sucess" })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async upadate(req, res) {
        const { product_id } = req.params;
        const { title, description, price, category } = req.body;

        try {
            const isValid = await mongoose.Types.ObjectId.isValid(product_id)
            if (!isValid) {
                throw { type: 'ValidationError', status: 404, message: 'Id invalid' };
            }

          


            const productAlreadyExists = await productModel.findOne({ _id: product_id });
            if (!productAlreadyExists) {
                throw { type: 'ValidationError', status: 404, message: 'Product not found'};
            }

            await productModel.updateOne(
                { _id: `${product_id}` }, {
                $set: {
                    title,
                    description,
                    price,
                    category
                }
            });

            return res.status(200).json({ Message: "Edit Sucess" })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}