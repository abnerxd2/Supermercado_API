import { Schema, model } from "mongoose";

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
});

const deleteCategoryAndReassignProducts = async (categoryIdToDelete) => {
  try {
    // 1. Verificar si la categoría a eliminar existe
    const categoryToDelete = await Category.findById(categoryIdToDelete);
    if (!categoryToDelete) {
      console.log("La categoría a eliminar no existe.");
      return;
    }

    // 2. Buscar la categoría por defecto (productosdefault)
    const defaultCategory = await Category.findOne({ name: "productosdefault" });
    if (!defaultCategory) {
      console.log("La categoría por defecto no existe.");
      return;
    }

    // 3. Buscar todos los productos que están asociados a la categoría a eliminar
    const productsToUpdate = await Product.find({ category: categoryIdToDelete });

    // Si no hay productos asociados, podemos proceder con la eliminación de la categoría
    if (productsToUpdate.length === 0) {
      console.log("No hay productos asociados a esta categoría.");
    } else {
      // 4. Actualizar los productos para que tengan la categoría por defecto
      const updatedProducts = await Product.updateMany(
        { category: categoryIdToDelete },  // Filtramos los productos por la categoría a eliminar
        { $set: { category: defaultCategory._id } }  // Actualizamos la categoría a la por defecto
      );
      console.log(`Se actualizaron ${updatedProducts.nModified} productos.`);
    }

    // 5. Eliminar la categoría original (la que vamos a eliminar)
    await Category.findByIdAndDelete(categoryIdToDelete);
    console.log("La categoría se eliminó correctamente.");

  } catch (error) {
    console.error("Error al eliminar la categoría y reasignar los productos:", error.message);
  }
};

export default deleteCategoryAndReassignProducts;
