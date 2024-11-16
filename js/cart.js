const TIPO_CAMBIO = 40; // tipo de cambio para hacer la conversión de dólares y pesos 
let cartItemsContainer = document.getElementById("cart-items");

// Se limpia el contenedor por si tiene contenido
cartItemsContainer.innerHTML = "";

// Se crea un span para el total
const totalElement = document.createElement("span");
totalElement.className = "total";
cartItemsContainer.appendChild(totalElement);

// Función para mostrar y actualizar el total 
function actualizarTotal() {
    actualizarCostos(); // muestra el costo de los productos
}

// Moneda
const currencySelector = document.getElementById("currency-type");
currencySelector.addEventListener("change", actualizarTotal);

// Función para actualizar la cantidad en el carrito
function actualizarCantidad(nombreProducto, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);
    let producto = listaCarrito.find(item => item.nombre === nombreProducto);

    if (producto) {
        producto.cantidad = nuevaCantidad; // Actualizar la cantidad
        let subtotal = producto.precio * producto.cantidad;
        let subtotalElement = document.querySelector(`.incart_subtotal[data-nombre="${producto.nombre}"]`);
        subtotalElement.textContent = `${subtotal.toFixed(2)} ${producto.moneda}`;
        localStorage.setItem("carrito", JSON.stringify(listaCarrito));
        actualizarCostos();
        actualizarTotal();
    }
}

// Mostrar los productos del carrito
listaCarrito.forEach(Originalproduct => {
    let subtotal = Originalproduct.precio * Originalproduct.cantidad;
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
    cartItemsContainer.innerHTML += item;
});

// variables para  los inputs de los costos 
let subtotalInput = document.getElementById("Subtotal");
let costoEnvioInput = document.getElementById("Costo-envio");
let totalInput = document.getElementById("Total");
let tipoEnvio = document.getElementById("shipping-type");

// Función para calcular el subtotal
function calcularSubtotal() {
    let subtotal = 0;
    listaCarrito.forEach(producto => {
        let subtotalProducto = producto.precio * producto.cantidad;
        if (currencySelector.value === "USD" && producto.moneda === "UYU") {
            subtotalProducto /= TIPO_CAMBIO;
        } else if (currencySelector.value === "UYU" && producto.moneda === "USD") {
            subtotalProducto *= TIPO_CAMBIO;
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
            porcentajeEnvio = 0.15;
            break;
        case "Express":
            porcentajeEnvio = 0.07;
            break;
        case "Standard":
            porcentajeEnvio = 0.05;
            break;
        default:
            porcentajeEnvio = 0;
    }
    return subtotal * porcentajeEnvio;
}

// Función que actualiza los costos de subtotal y envío
function actualizarCostos() {
    let subtotal = calcularSubtotal();
    let costoEnvio = calcularCostoEnvio(subtotal);
    const currencyType = document.getElementById("currency-type").value;

    if (currencyType === "USD") {
        costoEnvio /= TIPO_CAMBIO;
    }

    let total = subtotal + costoEnvio;
    subtotalInput.value = `${subtotal.toFixed(2)} ${currencyType}`;
    costoEnvioInput.value = `${costoEnvio.toFixed(2)} ${currencyType}`;
    totalInput.value = `${total.toFixed(2)} ${currencyType}`;
}

// Actualizar costos cuando cambia el tipo de envío
tipoEnvio.addEventListener("change", actualizarCostos);

// Se actualiza el total inicialmente
actualizarCostos();

//EVENTO DE FINALIZAR COMPRA!!!!!!!!!!!!!!!!!11
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('checkoutForm').addEventListener('click', function (event) {
        event.preventDefault();

        // Se toman los datos de los inputs del form 
        let departamento = document.getElementById("Departamento-address").value;
        let localidad = document.getElementById("Localidad-address").value;
        let calle = document.getElementById("Calle-address").value;
        let numero = document.getElementById("Numero-address").value;
        let esquina = document.getElementById("Esquina-address").value;
        let formaDePago = document.getElementById("payment").value;
        let formaDeEnvio = document.getElementById("shipping-type").value;

        //se verifica que se haya completado todoooo
        if (departamento && localidad && calle && numero && esquina && formaDePago && formaDeEnvio) {
            const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));

            //SE CIERRA EL Modal
            checkoutModal.hide();
            checkoutModal._element.addEventListener('hidden.bs.modal', function () {
                //SE VACIA EL CARRITO Y EL BADGE SE MUESTRA EN CERO PARA INICIAR UNA NUEVA COMPRA 
                localStorage.removeItem("carrito");

                // Se muestra un mensaje para agradecer la compra y redirigir a products y seguir comprando
                const cartContainer = document.getElementById("cart-container");
                cartContainer.innerHTML = `
                    <div class="text-center">
                        <h3>¡Gracias por su compra!</h3>
                        <p>Su compra se ha realizado con éxito.</p>
                        <button class="btn btn-primary" onclick="window.location.href='products.html'">Seguir comprando</button>
                    </div>
                `;

                const cartItems = document.getElementById('cart-items');
                if (cartItems) {
                    cartItems.innerHTML = ''; // Vaciar el carrito para iniciar una nueva compra 
                }
            });
        } else {
            // Alerta si falta completar algo
            alert("Por favor complete todos los campos.");
        }
    });
});

// Mostrar el modal de checkout
document.getElementById('mostrarModal').addEventListener('click', function () {
    const myModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    myModal.show();
});
