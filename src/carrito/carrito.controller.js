import Cart from "./carrito.model.js";
import Product from "../products/products.model.js";



export const addProductToCart = async (req, res) => {
    try {
      const userId = req.usuario._id;
      const { productId, quantity } = req.body;
  
      // Verificar si la cantidad es válida
      if (quantity <= 0 || quantity > 10) {
        return res.status(400).json({
          success: false,
          message: "La cantidad debe estar entre 1 y 10 productos",
        });
      }
  
      console.log("Product ID recibido:", productId); // Verificar que se recibe el ID correctamente
  
      // Verificar si el producto existe
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
      }
      console.log("Producto encontrado:", product); // Verificar que el producto existe
  
      // Verificar si el carrito ya existe para el usuario
      let cart = await Cart.findOne({ user: userId }).populate("products.product");
  
      console.log("Carrito encontrado:", cart); // Verificar que el carrito se obtiene correctamente
  
      if (cart) {
        // Si el carrito ya existe, verificamos si el producto ya está en el carrito
        const productIndex = cart.products.findIndex(
          (item) => item.product._id.toString() === productId
        );
  
        if (productIndex > -1) {
          // Si ya existe, actualizamos la cantidad
          cart.products[productIndex].quantity += quantity;
        } else {
          // Si el producto no está en el carrito, lo agregamos
          cart.products.push({ product: productId, quantity });
        }
      } else {
        // Si el carrito no existe, creamos uno nuevo
        cart = new Cart({
          user: userId,
          products: [{ product: productId, quantity }],
          totalPrice: 0, // Se calculará después
        });
      }
  
      // Calcular el total del carrito correctamente
      const totalPrice = await Promise.all(
        cart.products.map(async (item) => {
          const prod = await Product.findById(item.product);
          if (!prod) throw new Error("Producto no encontrado en la base de datos");
          return prod.precio * item.quantity;
        })
      ).then(prices => prices.reduce((total, price) => total + price, 0)); // Reducir el array de precios a un total
  
      // Asignar el precio total calculado al carrito
      cart.totalPrice = totalPrice;
  
      // Guardamos el carrito
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Producto agregado al carrito",
        cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al agregar el producto al carrito",
        error: error.message,
      });
    }
  };
  
  



export const removeProductFromCart = async (req, res) => {
    try {
      const userId = req.usuario._id; // Obtener el ID del usuario desde el token JWT
      const { productId } = req.body;
  
      // Buscar el carrito del usuario
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Carrito no encontrado",
        });
      }
  
      // Verificar si el producto está en el carrito
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado en el carrito",
        });
      }
  
      // Eliminar el producto del carrito
      cart.products.splice(productIndex, 1);
  
      // Calcular el total del carrito nuevamente
      cart.totalPrice = cart.products.reduce((total, item) => {
        const prod = item.product;
        return total + prod.precio * item.quantity;
      }, 0);
  
      // Guardar los cambios
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Producto eliminado del carrito",
        cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar el producto del carrito",
        error: error.message,
      });
    }
  };

  
  export const updateProductQuantityInCart = async (req, res) => {
    try {
      const userId = req.usuario._id; // Obtener el ID del usuario desde el token JWT
      const { productId, quantity } = req.body;
  
      if (quantity <= 0 || quantity > 10) {
        return res.status(400).json({
          success: false,
          message: "La cantidad debe estar entre 1 y 10 productos",
        });
      }
  
      // Buscar el carrito del usuario
      let cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: "Carrito no encontrado",
        });
      }
  
      // Verificar si el producto está en el carrito
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado en el carrito",
        });
      }
  
      // Actualizar la cantidad del producto
      cart.products[productIndex].quantity = quantity;
  
      // Calcular el total del carrito nuevamente
      cart.totalPrice = cart.products.reduce((total, item) => {
        const prod = item.product;
        return total + prod.precio * item.quantity;
      }, 0);
  
      // Guardar los cambios
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: "Cantidad actualizada en el carrito",
        cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al actualizar la cantidad del producto en el carrito",
        error: error.message,
      });
    }
  };
  
