const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Ruta para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Ruta para devolver el archivo cat.json
app.get('/cats/cat.json', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'backend', 'cat.json');
    console.log(`Archivo buscando: ${filePath}`);  // Esto es solo para depuración
    res.sendFile(filePath, (err) => {
        if (err) {
            console.log('Error al servir el archivo:', err);
            res.status(500).send('Error al servir el archivo');
        }
    });
});

// Ruta para devolver los productos de una categoría específica
app.get('/cats_products/:id.json', (req, res) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, 'emercado-api-main', 'backend', `cats_products_${id}.json`);
    res.sendFile(filePath);
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
