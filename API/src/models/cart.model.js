import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user_Id: { type: Number, required: true},
  products: [
    {
      product_Id: { type: Number,required: true },
      quantity: { type: Number, required: true },
      partial_cost: { type: Number, required: true }
    }
  ],
  Total_cost: { type: Number, required: true }
});

export default mongoose.model('Cart', CartSchema);