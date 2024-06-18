// src/controllers/user.controller.js
import User from '../models/user.model.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.idNum;
        const user = await User.findOne({ idNum: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
//const { fullName, email, password, country, city, address } = req.body;
export const registerUser = async (req, res) => {
    try {
        // Encuentra el usuario con el mayor idNum
        const lastUser = await User.findOne().sort({ idNum: -1 }).exec();
    
        // Incrementa el idNum
        const newIdNum = lastUser ? lastUser.idNum + 1 : 1;
    
        // Crear un nuevo usuario con el idNum incrementado
        const newUser = new User({
          ...req.body, //sintaxis de propagación 
          idNum: newIdNum
        });
    
        // Guardar el nuevo usuario en la base de datos
        await newUser.save();
    
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.idNum;
        const updatedUser = await User.findOneAndUpdate({ idNum: userId }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.idNum;
        const deletedUser = await User.findOneAndDelete({ idNum: userId });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
