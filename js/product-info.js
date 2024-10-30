let productId = localStorage.getItem("selectedProductId") //toma el id del producto seleccionado
let originalList = [];
let Originalproduct = {}; //definimos globalmente Originalproduct para usarlo en todos los archivos
let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [] ; //la usamos como variable global

document.addEventListener("DOMContentLoaded", function () {

    if (productId) {
        //se define el url de json para los detalles del producto
        const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

        fetch(productUrl)
            .then(response => response.json())  //pasa a formato json
            .then(product => {
                showProductInfoTable(product);

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
}); 
    
// Inicializar el carrito en localStorage si está vacío
if (!localStorage.getItem("carrito")) {
    localStorage.setItem("carrito", JSON.stringify([]));
}



//AQUI COMIENZA LA ENTREGA 6!!!!!!!!!!!!!!
//EVENTO CLICK PARA AGREGAR AL CARRITO

// Función para actualizar la burbuja de cantidad en el botón del carrito
function actualizarContadorCarrito() {
    const totalItems = listaCarrito.reduce((total, producto) => total + producto.cantidad, 0);
    const cartCount = document.getElementById("cart_count");
    if (cartCount) {
        cartCount.textContent = totalItems;
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
    
        actualizarContadorCarrito();

        // Mostrar alerta de éxit
        alert("¡Producto agregado al carrito exitosamente!");// alerta para confirmar que se agrego el producto correctamente

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
//AQUI FINALIZA LA ENTREGA 6!!!!!!!!!!!!!!!!!!!!!!!!! FUNCIONALIDADES PARA CARRITO


function showProductInfoTable(product) {           //Basado en showproducts table de products.js
    const productImages = document.querySelector('#productImages');
    const totalImages = product.images.length;

    productImages.innerHTML = '';

    // Crea elemento img y Agrega imagenes al carrusel 
    product.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = product.name;
        productImages.appendChild(imgElement);
    });

    // se muestran con querySelector la desc y otros detalles para organizar la tabla como queremos
    const descriptionElement = document.querySelector("#tinfo .header-description");
    const categoryElement = document.querySelector("#tinfo .header-category");
    
    if (descriptionElement) {
        descriptionElement.innerHTML = product.description;
    } 

    if (categoryElement) {
        categoryElement.querySelector('.texto-izq').innerText = product.category; //añade la cat del producto seleccionado
    } 
        categoryElement.querySelector('.texto-der').innerText = product.soldCount; //añade la cant de vendidos del producto seleccionado
    
    const nameElement = document.querySelector("thead .header-name");
    if (nameElement) {
        nameElement.innerText = product.name; //añade el nombre del producto seleccionado
    } 

    // Función y eventos para pasar las fotos
    let initialIndex = 0; 

    function updateCarousel() {
        const imgElements = productImages.querySelectorAll('img');  //se seleccionan las imagenes para el carrusel
        imgElements.forEach((img, index) => {
            img.style.display = index === initialIndex ? 'block' : 'none';
        });
    }

    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        initialIndex = (initialIndex + 1) % totalImages; //se suma 1
        updateCarousel();
    });   //evento para ir para adelante 

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        initialIndex = (initialIndex - 1 + totalImages) % totalImages; //para ir para atras se resta 1
        updateCarousel();
    });

    // Inicializa el carrusel al cargar
    updateCarousel();
}
//FUNCION PARA MOSTRAR LAS CALIFICACIONES DE LOS USUARIOS SEGUN EL PRODUCTO SELECCIONADO
function showProductsCalifications(userdata) {
    let productsHtml = ""; //comienza vacio 
    for (let p of userdata) { // se agrega un div para cada calificacion y otro div para las estrellas, se pone hr al final para separar cada una que se rellena
        productsHtml += `
            <div class="calification-item" data-id="${p.id}">   
                <div class="calification-header">
                    <span class="user-name">${p.user}</span>
                    <span class="calification-date">${p.dateTime}</span>
                </div>
                <div class="calification-stars">
                    ${getStars(p.score)}
                </div>
                <div class="calification-product">
                    <strong>Producto:</strong> ${p.product} 
                </div>
                <div class="calification-description">
                    <strong>Descripción:</strong> ${p.description}
                </div>
            </div>
            <hr> 
        `;
    }
    document.getElementById("ratings-list").innerHTML = productsHtml; // lo agrega al HTML
}

//FUNCION PARA RELLENAR LAS ESTRELLAS DEL 1 AL 5 
function getStars(score) {  
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) { //dependiendo del score del json y el ingresado luego por el form
        if (i <= score) {
            starsHtml += '<i class="fa fa-star fa-solid" style="color: gold;"></i>';  // estrella llena
        } else {
            starsHtml += '<i class="fa fa-star" style="color: gray;"></i>';  // estrella vacía en gris
        }
    }
    return starsHtml;
}
//FUNCION PARA MOSTRAR LOS PRODUCTOS RELACIONADOS

function showRelatedProducts(relatedProducts) {
    let productsHtml = "<tr>"; 
    for (let p of relatedProducts) { // se ponen en una fila las fotos y debajo los nombres 
        productsHtml += `
                         <td class="related-product-cell">
                <img src="${p.image}" alt="${p.name}" class="relatedproduct-image" data-id="${p.id}">
                <div class="relatedproductname">${p.name}</div>
            </td>`;
    }
    productsHtml += "</tr>";
    document.getElementById("related-products-table").innerHTML = productsHtml; //agrega al tbody de la tabla con el id correspondiente del html

    // seleccionamos las imágenes con la clase 'relatedproduct-image'
    const images = document.querySelectorAll(".relatedproduct-image");
    images.forEach(img => {
        img.addEventListener("click", function () {
            let relatedProductId = this.dataset.id; //obtener id del related product

            // se hace fetch con el id del producto relacionado seleccionado
            const productUrl = `https://japceibal.github.io/emercado-api/products/${relatedProductId}.json`;

            fetch(productUrl)
                .then(response => response.json())
                .then(product => {
                    showProductInfoTable(product); // actualiza la tabla para el producto relacionado seleccionado
                    showRelatedProducts(product.relatedProducts); // muestra productos relacionados al seleccionado
                    window.scrollTo(0, 0); //una vez que se hace click sube para mostrar la info del seleccionado
                })
                .catch(error => console.error("Error al cargar el producto:", error));
        });
    });
}

//funcion para agregar la calificacion ingresada por el usuario 

let usuario = localStorage.getItem("usuario") //se obtiene el nombre de usuario guardado en localStorage

document.getElementById("username").textContent = usuario //se agrega ese uruario en el label "username" del formulario "rating-form"

document.getElementById("enviar").addEventListener("click", sendCalification); 

function sendCalification() {
    //se obtienen los datos del formulario
    let comentario = document.getElementById("comment").value;
    let estrellas = document.getElementById("rating").value;
    
    if(comentario !== "" && estrellas !== ""){

    //se crea un objeto para la nueva calificacion
        const newCalification = {
            user: usuario,
            product: productId, // agrega el id del producto que se comenta
            description: comentario, // agrega el comentario que se ingresa
            score: parseInt(estrellas), // el numero de estrellas 
            dateTime: new Date().toLocaleString() //guarda la fecha y hora de cuando se envio el form
        };
    

    // Agregar la nueva calificación al array 
    originalList.unshift(newCalification);  // se agrega al inicio de originalList que ya tenia todos los comentarios del json pre cargados

    //Muestra todas las calificaciones incluyendo la nueva arriba del todo
    showProductsCalifications(originalList);

    //Una vez enviado se limpia el formulario
    document.getElementById("rating-form").reset();
    }

else{
    alert("Por favor complete todos los campos")
    }
}

//ENTREGA 5 PARTE 4 MODO DIA MODO NOCHE//

document.getElementById("modeSwitch").addEventListener("change", function () {
    const body = document.body;
    const isDarkMode = this.checked;  // Verificar si el switch está activado
  
    // Cambiar el modo agregando o quitando la clase dark-mode
    body.classList.toggle("dark-mode", isDarkMode);
  
    // Cambiar el texto del label
    document.querySelector("label[for='modeSwitch']").textContent = isDarkMode ? "Modo Día" : "Modo Noche";
  
    // Guardar el modo en localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
  
  // Aplicar el modo guardado al cargar la página
  window.addEventListener("load", function () {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.getElementById("modeSwitch").checked = true;  // Activar el switch
      document.querySelector("label[for='modeSwitch']").textContent = "Modo Día";
    }
  });
  }
