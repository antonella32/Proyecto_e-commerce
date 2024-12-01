CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cost DECIMAL(10, 2) NOT NULL,
    imgSrc VARCHAR(255)
);

CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    soldcount INT DEFAULT 0,
    imgSrc VARCHAR(255)
);

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    isLoggedIn BOOLEAN DEFAULT FALSE
);

CREATE TABLE MetodoDePago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    description TEXT,
    estado VARCHAR(50) NOT NULL
);

CREATE TABLE Tarjeta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    idMetodoDePago INT NOT NULL,
    numeroTarjeta VARCHAR(255) NOT NULL,
    moneda VARCHAR(50) NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idMetodoDePago) REFERENCES MetodoDePago(id)
);

CREATE TABLE Carrito (
    idCarrito INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    producto INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (producto) REFERENCES Producto(id)
);
