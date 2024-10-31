// Obtener el carrito desde localStorage
let cartItemsContainer = document.getElementById("cart-items");

// Limpiar el contenedor en caso de que ya tenga contenido
cartItemsContainer.innerHTML = "";

// Función para actualizar la cantidad en el carrito
function actualizarCantidad(nombreProducto, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad); // Asegúrate de que sea un número entero
    // Actualizar cantidad en el carrito
    let producto = listaCarrito.find(item => item.nombre === nombreProducto);
    if (producto) {
        producto.cantidad = nuevaCantidad; // Actualiza la cantidad en el carrito
        localStorage.setItem("carrito", JSON.stringify(listaCarrito)); // Guarda en localStorage
        mostrarSubtotal(producto); // Actualiza el subtotal
    }
}

// Función para mostrar el subtotal del producto
function mostrarSubtotal(producto) {
    let subtotalElement = document.querySelector(`.subtotal[data-nombre="${producto.nombre}"]`);
    if (subtotalElement) {
        let subtotal = producto.precio * producto.cantidad;
        subtotalElement.innerText = `Subtotal: ${subtotal} ${producto.moneda}`;
    }
}

// Iterar sobre los productos en el carrito y crear los elementos de la lista
listaCarrito.forEach(Originalproduct => {
    let subtotal = Originalproduct.precio * Originalproduct.cantidad; // Calcular subtotal

    let item = `
        <div class="cart-item">
            <div><h5>${Originalproduct.nombre}</h5></div>
            <div>Costo: ${Originalproduct.precio} ${Originalproduct.moneda}</div>
            <div>
                Cantidad: 
                <input type="number" value="${Originalproduct.cantidad}" min="1" onchange="actualizarCantidad('${Originalproduct.nombre}', this.value)">
            </div>
            <div><img src="${Originalproduct.imagen}" alt="${Originalproduct.nombre}" /></div>
            <div class="subtotal" data-nombre="${Originalproduct.nombre}">Subtotal: ${subtotal} ${Originalproduct.moneda}</div>
        </div>
    `;
    cartItemsContainer.innerHTML += item; // Agregar el elemento al contenedor
});
