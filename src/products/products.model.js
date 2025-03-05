import { Schema, model, mongo } from "mongoose";

const productSchema = Schema({

  nameProducto: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  precio: {
    type: Number,
    required: true, 
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", 
  },
  Existencias: {
    type: String,
    enum: ["Activa", "Inactiva"],
    default: "Activa",
  },
  catntidad:{
    type: Number,
    required:true,

  },
  ventas: { 
    type: Number, 
    default: 0 
  },
});


export default model("Product", productSchema);