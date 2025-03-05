import { Schema, model } from "mongoose";

const cartSchema =  Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Relaciona el carrito con un usuario
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Relaciona el carrito con productos
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

export default model("Cart", cartSchema);
