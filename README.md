# Supermercado_API

## Rutas de la API

### Autenticación
- `POST /Supermercado/v1/auth/register`: Registra un nuevo usuario.
- `POST /Supermercado/v1/auth/login`: Inicia sesión un usuario.

### Usuarios
- `GET /Supermercado/v1/user`: Obtiene la lista de usuarios.
- `GET /Supermercado/v1/user/:id`: Obtiene un usuario por ID.
- `PUT /Supermercado/v1/user/:id`: Actualiza un usuario por ID.
- `DELETE /Supermercado/v1/user/:id`: Elimina un usuario por ID.

### Categorías
- `GET /Supermercado/v1/category`: Obtiene la lista de categorías.
- `POST /Supermercado/v1/category`: Crea una nueva categoría.
- `PUT /Supermercado/v1/category/:id`: Actualiza una categoría por ID.
- `DELETE /Supermercado/v1/category/:id`: Elimina una categoría por ID.

### Productos
- `GET /Supermercado/v1/product`: Obtiene la lista de productos.
- `POST /Supermercado/v1/product`: Crea un nuevo producto.
- `PUT /Supermercado/v1/product/:id`: Actualiza un producto por ID.
- `DELETE /Supermercado/v1/product/:id`: Elimina un producto por ID.

### Carrito
- `GET /Supermercado/v1/car`: Obtiene el carrito del usuario.
- `POST /Supermercado/v1/car`: Agrega un producto al carrito.
- `DELETE /Supermercado/v1/car/:id`: Elimina un producto del carrito.

### Factura
- `POST /Supermercado/v1/factura`: Genera una factura en PDF.

## Documentación de la API
La documentación de la API está disponible en: `http://localhost:3001/api-docs`

## Generación de Facturas
Las facturas generadas se guardan en la carpeta `src/products/` con el nombre `Factura_<username>_<timestamp>.pdf`.