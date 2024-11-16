const TIPO_CAMBIO = 40; // 1 USD = 40 UYU
let cartItemsContainer = document.getElementById("cart-items");

// Limpiar el contenedor en caso de que ya tenga contenido
cartItemsContainer.innerHTML = "";

// Crear un elemento para mostrar el total
const totalElement = document.createElement("span");
totalElement.className = "total"; // Puedes agregar una clase para estilizar
cartItemsContainer.appendChild(totalElement);

// Función para calcular y mostrar el total
function actualizarTotal() {
    actualizarCostos(); // Centraliza la lógica en actualizarCostos
}

const currencySelector = document.getElementById("currency-type");
currencySelector.addEventListener("change", actualizarTotal);


//............
//Se tiene el total y el subtotal en tiempo real
//subtotal para cada producto y el total que suma todos los subtotales
//..........

// Función para actualizar la cantidad en el carrito
function actualizarCantidad(nombreProducto, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);

    // Buscar el producto en la lista
    let producto = listaCarrito.find(item => item.nombre === nombreProducto);

    if (producto) {
        producto.cantidad = nuevaCantidad; // Actualizar la cantidad

        // Calcular el nuevo subtotal
        let subtotal = producto.precio * producto.cantidad;

        // Actualizar el subtotal en el DOM sin cambiar la moneda
        let subtotalElement = document.querySelector(
            `.incart_subtotal[data-nombre="${producto.nombre}"]`
        );
        subtotalElement.textContent = `${subtotal.toFixed(2)} ${producto.moneda}`;

        // Guardar en LocalStorage
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));

        // Actualizar los costos globales (en la moneda seleccionada)
        actualizarCostos();
        actualizarTotal();
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

// Elementos para mostrar los costos
let subtotalInput = document.getElementById("Subtotal");
let costoEnvioInput = document.getElementById("Costo-envio");
let totalInput = document.getElementById("Total");
let tipoEnvio = document.getElementById("shipping-type");

// Función para calcular el subtotal
function calcularSubtotal() {
    let subtotal = 0;
    listaCarrito.forEach(producto => {
        let subtotalProducto = producto.precio * producto.cantidad;
        
        // Si la moneda seleccionada es USD, convertir el subtotal del producto
        if (currencySelector.value === "USD" && producto.moneda === "UYU") {
            subtotalProducto /= TIPO_CAMBIO; // Convertir a USD si es en UYU
        } else if (currencySelector.value === "UYU" && producto.moneda === "USD") {
            subtotalProducto *= TIPO_CAMBIO; // Convertir a UYU si es en USD
        }

        subtotal += subtotalProducto;
    });
    return subtotal;
}

// Función para calcular el costo de envío
function calcularCostoEnvio(subtotal) {
    let porcentajeEnvio = 0;
    switch (tipoEnvio.value) {
        case "Premium":
            porcentajeEnvio = 0.15; // 15%
            break;
        case "Express":
            porcentajeEnvio = 0.07; // 7%
            break;
        case "Standard":
            porcentajeEnvio = 0.05; // 5%
            break;
        default:
            porcentajeEnvio = 0;
    }
    return subtotal * porcentajeEnvio;
}

// Función para actualizar todos los costos
function actualizarCostos() {
    let subtotal = calcularSubtotal(); // Calcula el subtotal
    let costoEnvio = calcularCostoEnvio(subtotal); // Calcula el costo de envío
    const currencyType = document.getElementById("currency-type").value; // Moneda seleccionada

    // Convertir costo de envío según la moneda seleccionada
    if (currencyType === "USD") {
        costoEnvio /= TIPO_CAMBIO;
    } 

    let total = subtotal + costoEnvio; // Calcula el total

    // Mostrar los valores actualizados en los campos correspondientes
    subtotalInput.value = `${subtotal.toFixed(2)} ${currencyType}`;
    costoEnvioInput.value = `${costoEnvio.toFixed(2)} ${currencyType}`;
    totalInput.value = `${total.toFixed(2)} ${currencyType}`;
}


// Event listener para cambios en el tipo de envío
tipoEnvio.addEventListener("change", actualizarCostos);

// Actualiza los costos inicialmente
actualizarCostos();

//.....................//

// Calcular el total inicialmente
actualizarTotal();


// se crea un div para el boton y el total
const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container"; //clase para estilo

// Agregar el botón y el span del total al contenedor
buttonContainer.appendChild(botonComprar);
buttonContainer.appendChild(totalElement); // Agrega el span del total al contenedor
cartItemsContainer.appendChild(buttonContainer); // Agrega el contenedor al carrito

//Funcion finalizar compra
let botonCheckOut = document.getElementById("Checkout");
let departamento = document.getElementById("Departamento-address");
let localidad = document.getElementById("Localidad-address");
let calle = document.getElementById("Calle-address");
let numero = document.getElementById("Numero-address");
let esquina = document.getElementById("Esquina-address");
let formaDePago = document.getElementById("payment")
let formaDeEnvio = document.getElementById("shipping-type")
let formulario = document.getElementById("checkoutForm");

formulario.addEventListener("submit", function(event){

    if(departamento.value && localidad.value && calle.value && numero.value && esquina.value && formaDePago.value && formaDeEnvio.value){
        alert("Compra exitosa")
    }
    else{
        alert("Por favor complete todo los campos")
        event.preventDefault();
    }
})
