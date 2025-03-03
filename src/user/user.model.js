import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  },  
  estadoCuenta: {
    type: String,
    enum: ["Activa", "Inactiva"],
    default: "Activa",
  },
  nit:{
    type: String,
    required:true,
    default:"CF"

  }
});


export default model("Category", categorySchema);


