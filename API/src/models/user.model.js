// src/models/user.model.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true }
});

export default mongoose.model('User', UserSchema);
