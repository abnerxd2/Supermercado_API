import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname:{
    type: String,
  },
  correoElectronico: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true, 
  },

  role: {
    type: String,
    enum: ["CLIENT_ROLE", "ADMIN_ROLE"],
    default: "cliente", 
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


export default model("User", userSchema);