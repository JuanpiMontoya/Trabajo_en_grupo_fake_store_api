import Cart from '../models/cart.model.js';
import { getAllProducts, getProductById, getProductsByCategory, getCategories } from '../controllers/product.controller.js';
import { getUsers, getUserById, registerUser, updateUser, deleteUser } from '../controllers/user.controller.js';


export const getCarts = async (req, res) => {
    try {
        const carritos = await Cart.find();
        res.status(200).json(carritos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCartByUserId = async (req, res) => {
    const  user_Id = req.params.user_Id;

    try {
        const carrito = await Cart.findOne({ user_Id:  user_Id });

        if (!carrito) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Agregar producto al carrito
export const addToCart = async (req, res) => {
    const { user_Id, product_Id, quantity } = req.body;

    try {
        // Obtener usuario por idNum
        const user = await User.getUserById(user_Id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Obtener producto por productId
        const product = await Product.getProductById(product_Id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let carrito = await Cart.findOne({ user_Id: user_Id });

        if (!carrito) {
            carrito = new Cart({
                user_Id: user_Id,
                products: [{ product_Id: product_Id, quantity: quantity, partial_cost: product.price * quantity }],
                Total_cost: product.price * quantity
            });
        } else {
            const existingProductIndex = carrito.products.findIndex(p => p.product_Id === productId);

            if (existingProductIndex !== -1) {
                carrito.products[existingProductIndex].quantity += quantity;
                carrito.products[existingProductIndex].partial_cost += product.price * quantity;
            } else {
                // Si el producto no está en el carrito, agregarlo
                carrito.products.push({ product_Id: product_Id, quantity: quantity, partial_cost: product.price * quantity });
            }

            // Recalcular el costo total del carrito
            carrito.Total_cost = carrito.products.reduce((total, product) => total + product.partial_cost, 0);
        }

        await carrito.save();
        res.status(201).json(carrito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar producto en el carrito
export const updateCartItem = async (req, res) => {
    const { user_Id, product_Id, quantity } = req.body;

    try {
        // Obtener usuario por idNum
        const user = await User.getUserById(user_Id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Obtener producto por productId
        const product = await Product.getProductById(product_Id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let carrito = await Cart.findOne({ user_Id: user_Id });

        if (!carrito) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Actualizar la cantidad y el costo parcial del producto en el carrito
        const existingProductIndex = carrito.products.findIndex(p => p.product_Id === product_Id);

        if (existingProductIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        carrito.products[existingProductIndex].quantity = quantity;
        carrito.products[existingProductIndex].partial_cost = product.price * quantity;

        // Recalcular el costo total del carrito
        carrito.Total_cost = carrito.products.reduce((total, product) => total + product.partial_cost, 0);

        await carrito.save();
        res.status(200).json(carrito);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar carrito por ID de usuario
export const deleteCartByUserId = async (req, res) => {
    const user_Id= req.params.user_Id;

    try {
        const deletedCart = await Cart.findOneAndDelete({ user_Id: user_Id });

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};