// Inicializar el carrito en localStorage si está vacío
if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

// Agregar el evento al botón "Agregar al carrito"
document.getElementById("add_to_cart").addEventListener("click", function agregarAlCarrito() {
    let listaCarrito = JSON.parse(localStorage.getItem("carrito"));

    // Crear el objeto del producto
    let objProducto = { nombre: "nP", costo: "10", moneda: "UYU", img: "imagenetc", cantidad: 1 };

    // Verificar si el producto ya está en el carrito
    let indiceProd = estaEnCarrito(listaCarrito, objProducto.nombre);
    if (indiceProd > -1) {
        // Si el producto ya existe, aumentar la cantidad
        listaCarrito[indiceProd].cantidad += 1;
    } else {
        // Si no existe, agregar el producto al carrito
        listaCarrito.push(objProducto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));

    // Mostrar alerta de éxito
    alert("¡Producto agregado al carrito exitosamente!");
});

// Función para verificar si el producto está en el carrito
function estaEnCarrito(productos, nombre) {
    return productos.findIndex(producto => producto.nombre === nombre);
}

// Inicializar el carrito en localStorage si está vacío (opcional, ya está hecho arriba)
if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

// Agregar el evento al botón "Agregar al carrito"
document.getElementById("add_to_cart").addEventListener("click", function agregarAlCarrito() {
    let listaCarrito = JSON.parse(localStorage.getItem("carrito"));

    // Crear el objeto del producto
    let objProducto = { nombre: "nP", costo: "10", moneda: "UYU", img: "imagenetc", cantidad: 1 };

    // Verificar si el producto ya está en el carrito
    let indiceProd = estaEnCarrito(listaCarrito, objProducto.nombre);
    if (indiceProd > -1) {
        // Si el producto ya existe, aumentar la cantidad
        listaCarrito[indiceProd].cantidad += 1;
    } else {
        // Si no existe, agregar el producto al carrito
        listaCarrito.push(objProducto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));
});

// Agregar el evento al botón "Comprar"
document.getElementById("go_to_cart").addEventListener("click", function () {
    window.location.href = "cart.html"; // Redirigir a cart.html
});

// Función para verificar si el producto está en el carrito
function estaEnCarrito(productos, nombre) {
    return productos.findIndex(producto => producto.nombre === nombre);
}

////

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el carrito desde localStorage
    let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let cartItemsContainer = document.getElementById("cart-items");

    // Limpiar el contenedor en caso de que ya tenga contenido
    cartItemsContainer.innerHTML = "";

    // Iterar sobre los productos en el carrito y crear los elementos de la lista
    listaCarrito.forEach(producto => {
        let subtotal = producto.costo * producto.cantidad; // Calcular subtotal

        let item = `
            <div class="cart-item">
                <div><h5>${producto.nombre}</h5></div>
                <div>Costo: ${producto.costo} ${producto.moneda}</div>
                <div>
                    Cantidad: 
                    <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad('${producto.nombre}', this.value)">
                </div>
                <div><img src="${producto.img}" alt="${producto.nombre}" /></div>
                <div class="subtotal">Subtotal: ${subtotal} ${producto.moneda}</div>
            </div>
        `;
        cartItemsContainer.innerHTML += item; // Agregar el elemento al contenedor
    });
});

// Función para actualizar la cantidad del producto en el carrito
function actualizarCantidad(nombre, nuevaCantidad) {
    let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let indiceProd = estaEnCarrito(listaCarrito, nombre);
    if (indiceProd > -1) {
        listaCarrito[indiceProd].cantidad = parseInt(nuevaCantidad); // Actualizar la cantidad
        localStorage.setItem("carrito", JSON.stringify(listaCarrito)); // Guardar cambios en localStorage
        // Actualizar el subtotal
        location.reload(); // Recargar la página para reflejar los cambios
    }
}