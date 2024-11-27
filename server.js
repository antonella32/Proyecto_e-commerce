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
    { username: 'user', password: 'pass' }
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

//PARTE 4
// Middleware de autorización
function verificarToken(req, res, next) {
  // Obtener el token del encabezado 'Authorization'
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  // Eliminar el prefijo "Bearer " del token, si está presente
  const tokenSinBearer = token.replace('Bearer ', '');

  // Verificar y decodificar el token
  jwt.verify(tokenSinBearer, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    // Almacenar el usuario decodificado para usarlo en las rutas siguientes
    req.user = decoded;

    // Continuar con la ejecución de la siguiente función de la ruta
    next();
  });
}

module.exports = verificarToken;

//

// Middleware para servir archivos estáticos desde la carpeta emercado-api-main
app.use('/api', express.static(path.join(__dirname, 'emercado-api-main')));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del e-commerce');
});

// Ruta para obtener todas las categorías (cat.json) - Protegida
app.get('/api/cats', verificarToken, (req, res) => {
  const catsPath = path.join(__dirname, 'emercado-api-main', 'cats', 'cat.json');
  
  // Verificar si el archivo existe
  if (fs.existsSync(catsPath)) {
    res.sendFile(catsPath); // Devolver el archivo JSON de todas las categorías
  } else {
    res.status(404).send('Archivo de categorías no encontrado');
  }
});

// Ruta para obtener un producto específico usando su ID (en products) - Protegida
app.get('/api/products/:productId', verificarToken, (req, res) => {
  const productId = req.params.productId; // ID de producto
  const productPath = path.join(__dirname, 'emercado-api-main', 'products', `${productId}.json`);

  // Verificar si el archivo existe
  if (fs.existsSync(productPath)) {
    res.sendFile(productPath); // Devolver el archivo JSON del producto
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta para obtener los comentarios de un producto específico - Protegida
app.get('/api/products_comments/:productId', verificarToken, (req, res) => {
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

