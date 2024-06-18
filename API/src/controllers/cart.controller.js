import Cart from '../models/cart.model.js';
import { getUserById } from '../controllers/user.controller.js'; // Asegúrate de importar correctamente las funciones del controlador de usuarios
import { getProductById } from '../controllers/product.controller.js'; 


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


export const addToCart = async (req, res) => {
    const { user_Id, product_Id, quantity } = req.body;

    try {
        // Verifica si el usuario existe utilizando la función del controlador de usuarios
        const user = await getUserById(user_Id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifica si el producto existe utilizando la función del controlador de productos
        const product = await getProductById(product_Id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Crea un nuevo carrito o encuentra el carrito existente por user_Id
        let carrito = await Cart.findOne({ user_Id });

        if (!carrito) {
            carrito = new Cart({
                user_Id,
                products: [{ product_Id, quantity, partial_cost: product.price * quantity }],
                Total_cost: product.price * quantity
            });
        } else {
            // Verifica si el producto ya está en el carrito
            const existingProductIndex = carrito.products.findIndex(p => p.product_Id === product_Id);

            if (existingProductIndex !== -1) {
                // Actualiza la cantidad y el costo parcial del producto existente en el carrito
                carrito.products[existingProductIndex].quantity += quantity;
                carrito.products[existingProductIndex].partial_cost += product.price * quantity;
            } else {
                // Agrega el producto al carrito si no está presente
                carrito.products.push({ product_Id, quantity, partial_cost: product.price * quantity });
            }

            // Recalcula el costo total del carrito
            carrito.Total_cost = carrito.products.reduce((total, product) => total + product.partial_cost, 0);
        }

        // Guarda el carrito actualizado en la base de datos
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
        // Obtener usuario por idNum utilizando la función del controlador de usuarios
        const user = await getUserById(user_Id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Obtener producto por productId (si es necesario)
        const product = await getProductById(product_Id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let carrito = await Cart.findOne({ user_Id });

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
    const user_Id = req.params.user_Id;

    try {
        const deletedCart = await Cart.findOneAndDelete({ user_Id });

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};