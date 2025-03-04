import Category from "./category.model.js";
import mongoose from "mongoose";



const createCategory = async () => {
    try {
  
      const categoryExist = await Category.findOne({_id: `60b8f9f2b4b9b1562c41b2e1`});
  
      if (categoryExist) {
        console.log("La categoria por defecto ya existe.");
        return;
      } 
      const customId = new mongoose.Types.ObjectId("60b8f9f2b4b9b1562c41b2e1");
      const categoryDefault = new Category({
        _id: customId,
        name: "productosdefault",
        description: "Productos sin Categoria especifica "
      });
  
      await categoryDefault.save();
      console.log("La categoria por defecto se a creado correctamente.");
    } catch (error) {
      console.error("Error al verificar o crear la categoria:", error.message);
    }
  };
  
  export default createCategory;