const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');  //EL CORS
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const mysql = require('mysql2'); //sql para el desafiate
const PORT = 3000;

app.use(cors()); //se usa cors en todas las rutas
app.use(express.json());

//parte TREs!!!!!!!!!!!!!
//usuario para probar el endpoint post en postman
const users = [
    { username: 'name', password: 'password' }
  ];
  

// Ruta POST para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    //se verifica que el usuario existe
    const user = users.find(u => u.username === username && u.password === password);
  
    //si el usuario existe se crea un token
    if (user) {
    

     //ACA SE GENERA EL TOKEN
      const token = jwt.sign({ username: user.username }, 'secreto', { expiresIn: '1h' });
      res.json({ token }); //devuelve el token
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' }); // Si no se encuentran las credenciales
    }
  });



//ACA TERMINA LA PARTE 3!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!PARTE 4!!!!!!!!!!!!!!!!!!!!

// Middleware de autorización
function verificarToken(req, res, next) {  //funcion verificartoken
  //en postman en authorization se pone el token generado en post login 
  const token = req.headers['authorization']; //aqui toma el token 

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }  //si el token no corresponde da acceso denegado

  //si el token se genera con la Bearer se reemplaza por vacio asi solo queda el token
  const tokenSinBearer = token.replace('Bearer ', '');


  //se verifica y decodifica el token
  jwt.verify(tokenSinBearer, 'secreto', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    //se almacena el usuario decodificado apra usarlo ne las rutas siguientes
    req.user = decoded;

    // se continua con la ejecución
    next();
  });
}

module.exports = verificarToken;



// Middleware para servir archivos estáticos desde la carpeta emercado-api-main
app.use('/api', express.static(path.join(__dirname, 'emercado-api-main')));

//Ruta para probar en postman
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del e-commerce');
});

//------------------------------------------------------------------

//Ruta para obtener la categoría, esta ruta esta protegida con verificar token
app.get('/api/cats', verificarToken, (req, res) => {
  const catsPath = path.join(__dirname, 'emercado-api-main', 'cats', 'cat.json');
  
  // Verificar si el archivo existe
  if (fs.existsSync(catsPath)) {
    res.sendFile(catsPath); // Devolver el archivo JSON de todas las categorías
  } else {
    res.status(404).send('Archivo de categorías no encontrado');
  }
});
//------------------------------------------------------------------
//------------------------------------------------------------------

//Ruta para obtener la categoría, esta ruta esta protegida con verificar token
app.get('/api/cats_products/:catID', verificarToken, (req, res) => {
  const catID = req.params.catID;
  const catsproductsPath = path.join(__dirname, 'emercado-api-main', 'cats_products', `${catID}.json`);
  
  // Verificar si el archivo existe
  if (fs.existsSync(catsproductsPath)) {
    res.sendFile(catsproductsPath); //devuelve json de cats
  } else {
    res.status(404).send('Archivo de categorías no encontrado');
  }
});
//------------------------------------------------------------------


//ruta para obtener un producto usando su ID, protegida 
app.get('/api/products/:productId', verificarToken, (req, res) => {
  const productId = req.params.productId; // ID de producto
  const productPath = path.join(__dirname, 'emercado-api-main', 'products', `${productId}.json`); //no es estatica

  //verifica que el archivo existe
  if (fs.existsSync(productPath)) {
    res.sendFile(productPath); //devuelve el json
  } else {
    res.status(404).send('Producto no encontrado');
  }
});
//------------------------------------------------------------------

// Ruta para obtener los comentarios de un producto con su ID, protegida
app.get('/api/products_comments/:productId', verificarToken, (req, res) => {
  const productId = req.params.productId; // ID del producto
  const commentsPath = path.join(__dirname, 'emercado-api-main', 'products_comments', `${productId}.json`);

  //verifica que exista el archivo aunque ya sabemos que si está esta bien implementarlo
  if (fs.existsSync(commentsPath)) {
    res.sendFile(commentsPath); //devuelve el json
  } else {
    res.status(404).send('Comentarios no encontrados');
  }
});
//------------------------------------------------------------------

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

