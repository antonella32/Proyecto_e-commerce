let productId = localStorage.getItem("selectedProductId") //toma el id del producto seleccionado
let originalList = [];
let Originalproduct = {}; //definimos globalmente Originalproduct para usarlo en todos los archivos
let listaCarrito = JSON.parse(localStorage.getItem("carrito")); //la usamos como variable global



document.addEventListener("DOMContentLoaded", function () {

    if (productId) {
        //se define el url de json para los detalles del producto
        const productUrl =`https:japceibal.github.io/emercado-api/products/${productId}.json`;

        fetch(productUrl)
            .then(response => response.json())  //pasa a formato json
            .then(product => {
                showProductInfoTable(product);
                Originalproduct = product // igualamos parsa usar las propuedades de product
                showRelatedProducts(product.relatedProducts);
            })
        
        let url= `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
        fetch(url)
        .then(response => response.json())
        .then(comments => {
            originalList = comments; //se inicializa una lista para rellenar con los comentarios que vienen del json
            showProductsCalifications(originalList) //muestra la lista original
        })  
    } 
// Inicializar el carrito en localStorage si está vacío
if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}

//AQUI COMIENZA LA ENTREGA 6!!!!!!!!!!!!!!
//EVENTO CLICK PARA AGREGAR AL CARRITO

// Función para actualizar la burbuja de cantidad en el botón del carrito
function actualizarContadorCarrito() {
    const totalItems = listaCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById("cart_count").textContent = totalItems;
}

// Llamar a la función al cargar la página para mostrar la cantidad actual
actualizarContadorCarrito();

    document.getElementById("add_to_cart").addEventListener("click", function agregarAlCarrito() {

        let objProducto = {
            id: Originalproduct.id, 
            nombre: Originalproduct.name, 
            precio: Originalproduct.cost, 
            imagen: Originalproduct.images[0], 
            moneda: Originalproduct.currency,
            cantidad: 1 
            
        };  // SE DEFINE objProducto con las propiedades que se deben mostrar en el carrito
    
        let indiceProd = estaEnCarrito(listaCarrito, objProducto.nombre); //indiceprod
        if (indiceProd > -1) { //si el proucto esta en el carrito se le suma 1 a la cantidad
            listaCarrito[indiceProd].cantidad += 1;
            
        } else {
            listaCarrito.push(objProducto); // si no se agrega a la lista del carrito
        }
        localStorage.setItem("carrito", JSON.stringify(listaCarrito)); //se fija en el local storage
    
        // Mostrar alerta de éxit
        alert("¡Producto agregado al carrito exitosamente!");// alerta para confirmar que se agrego el producto correctamente

    });
   
   
}); 

//EVENTO PARA EL GO TO CART REDIRIGIR AL CARRITO CART.HTML !!!!!!!!!!!!!

//cuando se hace click en comprar ADEMAS de redirigir se AUMENTA la cantidad en el carrito
document.getElementById("go_to_cart").addEventListener("click", function () {
    //error para visualizar en la consola si es necesario
    if (!Originalproduct) {
        console.error("No hay producto seleccionado.");
        return;
    }

    // Crear el objeto del producto
    let objProducto = {
        id: Originalproduct.id,
        nombre: Originalproduct.name,
        precio: Originalproduct.cost,
        imagen: Originalproduct.images[0],
        moneda: Originalproduct.currency,
        cantidad: 1 // Se establece la cantidad inicial
    };
//utilizamos lo mismo que add to cart para aumentar la cantidad
    let indiceProd = estaEnCarrito(listaCarrito, objProducto.nombre);
    if (indiceProd > -1) {
        listaCarrito[indiceProd].cantidad += 1;
    } else {
        listaCarrito.push(objProducto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));

    // Actualizar la burbuja de cantidad antes de redirigir
    actualizarContadorCarrito();

    // Redirigir a cart.html
    window.location.href = "cart.html";
});
//verifica si el producto ya esta en el carrito
function estaEnCarrito(productos, nombre) {
    return productos.findIndex(producto => producto.nombre === nombre);
}

//
