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

//............
//Se tiene el total y el subtotal en tiempo real
//subtotal para cada producto y el total que suma todos los subtotales
//..........

// Función para actualizar la cantidad en el carrito
function actualizarCantidad(nombreProducto, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);
    // Actualizar cantidad en el carrito
    let producto = listaCarrito.find(item => item.nombre === nombreProducto);
    if (producto) {
        producto.cantidad = nuevaCantidad; //importante, se actualiza la cantidad en el carrito 
        localStorage.setItem("carrito", JSON.stringify(listaCarrito)); //se guarda en local storage
        mostrarSubtotal(producto); //con esto se actualiza el subtotal
        actualizarTotal(); // con esto se actualiza el total
    }
}

//Crear los elementos de la lista para mostrar en la pantalla de cart.html
listaCarrito.forEach(Originalproduct => {
    let subtotal = Originalproduct.precio * Originalproduct.cantidad; // Calcular subtotal
    //SE CREAN EN EL HTML LOS DIVS PARA CARGAR LOS PRODUCTOS AGREGADOS AL CARRITO
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
    cartItemsContainer.innerHTML += item; // AQUI SE AGREFAN AL DIV DE CLASE CART ITEM
});

//.....................//

// Calcular el total inicialmente
actualizarTotal();

// Agregar botón de compra
const botonComprar = document.createElement("button");
botonComprar.innerText = "Comprar";
botonComprar.className = "btn btn-primary position-relative"; 
botonComprar.onclick = function() {
    
    alert("Gracias por tu compra!"); // alerta para cuando se clickea el boton comprar
};

// se crea un div para el boton y el total
const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container"; //clase para estilo

// Agregar el botón y el span del total al contenedor
buttonContainer.appendChild(botonComprar);
buttonContainer.appendChild(totalElement); // Agrega el span del total al contenedor
cartItemsContainer.appendChild(buttonContainer); // Agrega el contenedor al carrito
