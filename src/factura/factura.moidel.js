import { Schema, model } from "mongoose";

const invoiceSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Relaciona la factura con un usuario
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Relaciona la factura con productos
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("Invoice", invoiceSchema);
