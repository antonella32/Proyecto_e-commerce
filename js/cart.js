let cartItemsContainer = document.getElementById("cart-items");

// Limpiar el contenedor en caso de que ya tenga contenido
cartItemsContainer.innerHTML = "";

// Crear un elemento para mostrar el total
const totalElement = document.createElement("span");
totalElement.className = "total"; // Puedes agregar una clase para estilizar
cartItemsContainer.appendChild(totalElement);

// Función para calcular y mostrar el total
function actualizarTotal() {
    let total = 0;
    listaCarrito.forEach(producto => {
        total += producto.precio * producto.cantidad; // Sumar subtotales
    });
    totalElement.innerText = `Total: ${total} ${listaCarrito[0]?.moneda || ''}`; // Mostrar total
}

// Función para mostrar el subtotal del producto
function mostrarSubtotal(producto) {
    let subtotalElement = document.querySelector(`.incart_subtotal[data-nombre="${producto.nombre}"]`);
    if (subtotalElement) {
        let subtotal = producto.precio * producto.cantidad;
        subtotalElement.innerText = `${subtotal} ${producto.moneda}`; // Muestra solo el subtotal
    }
}

// Función para actualizar la cantidad en el carrito
function actualizarCantidad(nombreProducto, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad); // Asegúrate de que sea un número entero
    // Actualizar cantidad en el carrito
    let producto = listaCarrito.find(item => item.nombre === nombreProducto);
    if (producto) {
        producto.cantidad = nuevaCantidad; // Actualiza la cantidad en el carrito
        localStorage.setItem("carrito", JSON.stringify(listaCarrito)); // Guarda en localStorage
        mostrarSubtotal(producto); // Actualiza el subtotal
        actualizarTotal(); // Actualiza el total
    }
}

// Iterar sobre los productos en el carrito y crear los elementos de la lista
listaCarrito.forEach(Originalproduct => {
    let subtotal = Originalproduct.precio * Originalproduct.cantidad; // Calcular subtotal

    let item = `
       <div class="cart-item">
            <div class="incart_image">
                <img src="${Originalproduct.imagen}" alt="${Originalproduct.nombre}" />
            </div>
            <div class="incart_details">
                <h5 class="incart_name">${Originalproduct.nombre}</h5>
                <div class="incart_cost">Costo: ${Originalproduct.precio} ${Originalproduct.moneda}</div>
            </div>
            <div class="incart_soldcount">
                Cantidad: 
                <input type="number" value="${Originalproduct.cantidad}" min="1" 
                onchange="actualizarCantidad('${Originalproduct.nombre}', this.value)">
                <div data-nombre="${Originalproduct.nombre}">Subtotal: <span class="incart_subtotal" data-nombre="${Originalproduct.nombre}">${subtotal} ${Originalproduct.moneda}</span></div>
            </div>
        </div>
    `;
    cartItemsContainer.innerHTML += item; // Agregar el elemento al contenedor
});

// Calcular el total inicialmente
actualizarTotal();

// Agregar botón de compra
const botonComprar = document.createElement("button");
botonComprar.innerText = "Comprar";
botonComprar.className = "btn btn-primary position-relative"; // Puedes agregar una clase para estilizar el botón
botonComprar.onclick = function() {
    // Aquí puedes manejar la lógica de compra
    alert("Gracias por tu compra!");
    // Puedes agregar más lógica aquí, como redirigir a otra página o limpiar el carrito
};

// Crear un contenedor para el botón y el total
const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container"; // Clase para estilizar el contenedor de botón y total

// Agregar el botón y el span del total al contenedor
buttonContainer.appendChild(botonComprar);
buttonContainer.appendChild(totalElement); // Agregar el span del total al contenedor
cartItemsContainer.appendChild(buttonContainer); // Agregar el contenedor al carrito
