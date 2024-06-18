const mongoose = require('mongoose')
const Product = require('../models/product.model');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const mappedProducts = products.map(product => {
            const productObj = product.toObject();
            productObj.id = productObj._id;
            delete productObj._id;
            return productObj;
        });
        res.status(200).json(mappedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productObj = product.toObject();
        productObj.id = productObj._id;
        delete productObj._id;

        res.status(200).json(productObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });
        const mappedProducts = products.map(product => {
            const productObj = product.toObject();
            productObj.id = productObj._id;
            delete productObj._id;
            return productObj;
        });
        res.status(200).json(mappedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las categorías de productos
exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};