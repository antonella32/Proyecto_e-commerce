const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Importa CORS
const app = express();
const PORT = 3000;
app.use(cors()); // Permite CORS en todas las rutas

// Middleware para servir archivos estáticos desde la carpeta emercado-api-main
app.use('/api', express.static(path.join(__dirname, 'emercado-api-main')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del e-commerce');
});

// Ruta para obtener todas las categorías (cat.json)
app.get('/api/cats', (req, res) => {
  const catsPath = path.join(__dirname, 'emercado-api-main', 'cats', 'cat.json');
  
  // Verificar si el archivo existe
  if (fs.existsSync(catsPath)) {
    res.sendFile(catsPath); // Devolver el archivo JSON de todas las categorías
  } else {
    res.status(404).send('Archivo de categorías no encontrado');
  }
});

// Ruta para obtener un producto específico usando su ID (en products)
app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId; // ID de producto
  const productPath = path.join(__dirname, 'emercado-api-main', 'products', `${productId}.json`);

  // Verificar si el archivo existe
  if (fs.existsSync(productPath)) {
    res.sendFile(productPath); // Devolver el archivo JSON del producto
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta para obtener los comentarios de un producto específico
app.get('/api/products_comments/:productId', (req, res) => {
  const productId = req.params.productId; // ID del producto
  const commentsPath = path.join(__dirname, 'emercado-api-main', 'products_comments', `${productId}.json`);

  // Verificar si el archivo de comentarios existe
  if (fs.existsSync(commentsPath)) {
    res.sendFile(commentsPath); // Devolver el archivo JSON de los comentarios
  } else {
    res.status(404).send('Comentarios no encontrados');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
