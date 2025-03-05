import Product from "../products/products.model.js"

import Category from "../category/category.model.js"


export const addProduct = async (req, res) =>{
try {
    const data = req.body
    const producto = await Product.create(data)
    return res.status(200).json({
        message: "producto creado esxitosamente"
        
    })

    
} catch (err) {
    console.log(err.message);

    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({
            message: ""
        });
    }

    return res.status(500).json({
        message: "failed",
        error: err.message
    });
}
    
}




export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(200).json({
            message: "Producto eliminado exitosamente",
            producto: deletedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar producto",
            error: error.message
        });
    }
};


export const listProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        return res.status(200).json({
            message: "Productos listados exitosamente",
            products
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al listar los productos",
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Producto actualizado exitosamente',
            producto: updatedProduct,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "No se pudo actualizar el producto",
            error: err.message,
        });
    }
};


export const filterProducts = async (req, res) => {
    try {
        const { name, categoryName } = req.query;

       
        const filter = {};

        
        if (name) {
            filter.nameProducto = { $regex: name, $options: 'i' }; 
        }

        if (categoryName) {
          
            const category = await Category.findOne({ name: { $regex: categoryName, $options: 'i' } });

            
            if (!category) {
                return res.status(404).json({ message: "Categoría no encontrada" });
            }


            filter.category = category._id;
        }

        
        const products = await Product.find(filter)
            .populate("category", "name description")  
            .exec();

        
        if (products.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos con esos filtros" });
        }

        return res.status(200).json({ products });

    } catch (error) {
        return res.status(500).json({ message: "Error al filtrar los productos", error: error.message });
    }
};
