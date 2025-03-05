import PDFDocument from "pdfkit";
import Cart from "../carrito/carrito.model.js";
import Product from "../products/products.model.js";
import User from "../user/user.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateInvoice = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cart = await Cart.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Carrito no encontrado",
      });
    }

    // Obtener el usuario actual
    const user = await User.findById(cart.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const purchasedProducts = cart.products.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));


    for (let item of purchasedProducts) {
      const product = await Product.findById(item.product);
      if (product) {
        product.catntidad -= item.quantity;
        product.ventas += item.quantity; 
        

        if (product.catntidad <= 0) {
          product.catntidad = 0;
          product.Existencias = "Inactiva";
        }

        await product.save();
      }
    }

    cart.products = [];
    await cart.save();


    const doc = new PDFDocument();
    let filename = `Factura_${user.username}_${Date.now()}.pdf`;
    let filepath = path.join(__dirname, "../factura/", filename);

    const writeStream = fs.createWriteStream(filepath);
    doc.pipe(writeStream);

    
    doc.fontSize(18).text("Factura de Compra", { align: "center" });
    doc.moveDown();

    // Nombre del usuario
    doc.fontSize(12).text(`Cliente: ${user.name} ${user.surname}`, { align: "left" });
    doc.moveDown();

    // Detalles de la compra
    doc.fontSize(12).text("Productos Comprados:", { align: "left" });
    doc.moveDown();

    let total = 0;
    for (let item of purchasedProducts) {
      const product = await Product.findById(item.product);
      if (product) {
        const subTotal = product.precio * item.quantity;
        total += subTotal;

        doc.text(
          `${product.nameProducto} - Cantidad: ${item.quantity} - Subtotal: Q${subTotal.toFixed(2)}`,
          { align: "left" }
        );
      }
    }

    doc.moveDown();
    doc.fontSize(12).text(`Total: Q${total.toFixed(2)}`, { align: "right" });
    doc.end();

    writeStream.on("finish", () => {
      res.json({
        success: true,
        message: "Factura generada exitosamente",
        filePath: filepath,
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al generar la factura",
      error: error.message,
    });
  }
};
