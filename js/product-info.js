let productId = localStorage.getItem("selectedProductId") //toma el id del producto seleccionado

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
            showProductsCalifications(comments)
        })  
    } 
}); 

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


let originalList = []; // 

function showProductsCalifications(userdata) {
    let productsHtml = "";
    for (let p of userdata) {
        productsHtml += `<tr data-id="${p.id}">

                            <td>${p.product}</td>
                            <td>${p.score}</td>
                            <td>${p.description}</td>
                            <td>${p.user}</td>
                            <td>${p.dateTime}</td>
                        </tr>`;
    }
    document.getElementById("ratings-list").innerHTML = productsHtml;
}

function showRelatedProducts(relatedProducts) {
    let productsHtml = "";
    for (let p of relatedProducts) {
        productsHtml += `
                            <td>${p.name}</td>
                            <td><img src="${p.image}" alt="${p.name}" class="product-image" data-id="${p.id}"></td>
                        </tr>`;
    }
    document.getElementById("related-products-list").innerHTML = productsHtml;

    // seleccionamos las imágenes con la clase 'product-image'
    const images = document.querySelectorAll(".product-image");
    images.forEach(img => {
        img.addEventListener("click", function () {
            let relatedProductId = this.dataset.id; //obtener id del related product

            // se hace fetch con el id del producto relacionado seleccionado
            const productUrl = `https://japceibal.github.io/emercado-api/products/${relatedProductId}.json`;

            fetch(productUrl)
                .then(response => response.json())
                .then(product => {
                    showProductInfoTable(product); // actualiza la tabla 
                    showRelatedProducts(product.relatedProducts); // muestra productos relacionados
                    window.scrollTo(0, 0);
                })
                .catch(error => console.error("Error al cargar el producto:", error));
        });
    });
}

//prueba para agregar el comentario de la calificación en el párrafo p
document.getElementById("enviar").addEventListener("click", sendCalification);
function sendCalification() {

    let comentario = document.getElementById("comment").value;
    let estrellas = document.getElementById("rating").value
    let usuario = document.getElementById("username").value
    document.getElementById("newCalification").innerHTML = usuario + comentario + estrellas;
}