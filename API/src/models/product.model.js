import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    rating: { type: RatingSchema, required: true },
}, { versionKey: false });

export default mongoose.model('Product', ProductSchema);