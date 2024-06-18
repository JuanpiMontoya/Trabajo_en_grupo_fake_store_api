// src/routes/user.routes.js
import express from 'express';
import { getUsers, getUserById, registerUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// Rutas para operaciones CRUD de usuarios
router.get('/', getUsers);
router.get('/:idNum', getUserById);
router.post('/register', registerUser);
router.put('/update/:idNum', updateUser);
router.delete('/delete/:idNum', deleteUser);

export default router;
