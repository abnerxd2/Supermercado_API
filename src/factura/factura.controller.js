import PDFDocument from "pdfkit";
import Cart from "../carrito/carrito.model.js";
import Product from "../products/products.model.js";
import User from "../user/user.model.js";

export const generateInvoice = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cart = await Cart.findById(cartId).populate("products.product"); // Populate para traer los productos

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

    // Crear el documento PDF
    const doc = new PDFDocument();
    let filename = `Factura_${user.username}_${Date.now()}.pdf`;
    filename = encodeURIComponent(filename);

    // Establecer los encabezados para la descarga del PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    doc.pipe(res); // Salida del archivo PDF al cliente

    // Título de la factura
    doc.fontSize(18).text("Factura de Compra", { align: "center" });
    doc.moveDown();

    // Nombre del usuario
    doc.fontSize(12).text(`Cliente: ${user.name} ${user.surname}`, {
      align: "left",
    });
    doc.moveDown();

    // Detalles de la compra
    doc.fontSize(12).text("Productos Comprados:", { align: "left" });
    doc.moveDown();

    // Iterar sobre los productos en el carrito y calcular los subtotales
    let total = 0;
    for (let item of cart.products) {
      const product = await Product.findById(item.product); // Usamos el modelo Product para obtener los detalles del producto
      if (product) {
        const subTotal = product.precio * item.quantity; // Calcular el subtotal
        total += subTotal;

        // Mostrar detalles del producto
        doc.text(
          `${product.nameProducto} - Cantidad: ${item.quantity} - Subtotal: Q${subTotal.toFixed(2)}`,
          { align: "left" }
        );
      }
    }

    doc.moveDown();
    doc.fontSize(12).text(`Total: Q${total.toFixed(2)}`, { align: "right" });

    // Finalizar y generar el PDF
    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al generar la factura",
      error: error.message,
    });
  }
};
