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
            const products = await productModel
                .find()
                .select('title').select('category');
            return res.status(200).json({ products });

        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async filter(req, res) {
        const { title, category } = req.query;

        try {
            const titleFilter = await productModel.findOne(
                {
                    title
                });

            const categoryFilter = await productModel.find(
                {
                    category
                });
            if (titleFilter) {
                return res.status(200).json({ titleFilter })
            }
            if (categoryFilter) {
                return res.status(200).json({ categoryFilter })
            }
            return res.status(400).json({ message: "Not Found" })

        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async destroy(req, res) {
        const { title } = req.params;

        try {
            const productDelete = await productModel.findOne({ title })

            if (!productDelete) {
                return res.status(400).json({ message: "product not found" })
            }

            await productModel.deleteOne({ _id: productDelete._id })

            return res.status(200).json({ Message: "Delete Sucess" })
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    },
    async upadate(req, res) {
        const { title, description, price, category } = req.body;

        try {
            const productedited = await productModel.findOne({ title })

            if (!productedited) {
                return res.status(400).json({ message: "Product not found" })
            }    

            await productModel.updateOne(
                { _id: `${productedited._id}` }, {
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