const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use('/products', productRoutes);
app.use('/users', userRoutes);

// Punto de entrada para el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
