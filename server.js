const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.use(cors()); // Permite CORS en todas las rutas
app.use(express.json());

//parte TRESSSSSSSSSSSSSSSSSSSS
const users = [
    { username: 'Antonella', password: 'Holamundo' }
  ];
  

  // Ruta para autenticar usuarios (POST /login)
// Ruta POST para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Verificar si el usuario existe
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      // Crear un token

     //ACA SE GENERA EL TOKEN
      const token = jwt.sign({ username: user.username }, 'secreto', { expiresIn: '1h' });
      res.json({ token }); // Devolver el token al cliente
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' }); // Si no se encuentran las credenciales
    }
  });



//PARTE TRES FIN

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

