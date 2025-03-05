import Category from "./category.model.js";
import Product  from "../products/products.model.js"
import mongoose from "mongoose";



const createCategory = async () => {
  console.log("mi mama me mima")
    try {
      const customId = new mongoose.Types.ObjectId("60b8f9f2b4b9b1562c41b2e1");

      const categoryExist = await Category.findOne({_id: customId});
      
  
      if (categoryExist) {
        console.log("La categoria por defecto ya existe.");
        return;
      } 

      console.log("Entre")
      const categoryDefault = new Category({
        _id: customId,
        name: "productosdefault",
        description: "Productos sin Categoria especifica ",
        
      });
      console.log("sali")
  
      await categoryDefault.save();
      console.log("La categoria por defecto se a creado correctamente.");
    } catch (error) {
      console.error("Error al verificar o crear la categoria:", error.message);
    }
  };
  
  export default createCategory; 

  

  export const deleteCategoy = async (req, res) => {
    const { categoryIdToDelete } = req.body;  
  
    if (!categoryIdToDelete) {
      return res.status(400).json({
        message: "Se requiere el ID de la categoría a eliminar."
      });
    }
  
    try {
   
      const categoryToDelete = await Category.findById(categoryIdToDelete);
      if (!categoryToDelete) {
        return res.status(404).json({
          message: "La categoría a eliminar no existe."
        });
      }
  
     
      const defaultCategory = await Category.findOne({ name: "productosdefault" });
      if (!defaultCategory) {
        return res.status(404).json({
          message: "La categoría por defecto no existe."
        });
      }
  

      const productsToUpdate = await Product.find({ category: categoryIdToDelete });
  
      if (productsToUpdate.length > 0) {
        const updatedProducts = await Product.updateMany(
          { category: categoryIdToDelete },
          { $set: { category: defaultCategory._id } }
        );
        console.log(`Se actualizaron ${updatedProducts.nModified} productos.`);
      }
  
      await Category.findByIdAndDelete(categoryIdToDelete);
      console.log("La categoría se eliminó correctamente.");
  
      return res.status(200).json({
        message: "Categoría eliminada y productos reasignados correctamente."
      });
  
    } catch (error) {
      console.error("Error al eliminar la categoría y reasignar los productos:", error.message);
      return res.status(500).json({
        message: "Error al eliminar la categoría y reasignar los productos.",
        error: error.message
      });
    }
  };
  
  
  export const addCategory = async (req, res) =>{

    try {
        const data = req.body
        const category = await Category.create(data)
        return res.status(200).json({
            message: "category creado esxitosamente"
            
        })
    
        
    } catch (err) {
        console.log(err.message);
    
        return res.status(500).json({
            message: "failed",
            error: err.message
        });
    }
        
    
  }