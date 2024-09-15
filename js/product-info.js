<<<<<<< Updated upstream
document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("selectedProductId"); //toma el id del producto seleccionado

    if (productId) {
        //se define el url de json para los detalles del producto
        const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

        fetch(productUrl)
            .then(response => response.json())  //pasa a formato json
            .then(product => {
                showProductInfoTable(product);
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
    
    const nameElement = document.querySelector("thead th.header-name");
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
=======
function getProductInfo(url) { // se sigue el esquema de la
    return fetch(url)
        .then(respuesta => respuesta.json())  // Convierte la respuesta a JSON
        .then(product => { 
            showProductInfoTable(product);  // Muestra los detalles del producto
        });
}

function showProductInfoTable(product) {
    const imageGallery = document.querySelector('#productImages');
    const totalImages = product.images.length;

    // Limpiar el contenedor de imágenes, si no se van a ver dobles
    imageGallery.innerHTML = '';

    // Crear un contenedor de imagen para el carrusel
    const imgElement = document.createElement('img');
    imgElement.src = product.images[0];
    imgElement.alt = product.name;
    imageGallery.appendChild(imgElement);

    // Mostrar descripción y otros detalles, se usa query selector para ordenar como queremos en la tabla
    document.querySelector("#tinfo .header-description").innerHTML = product.description;
    document.querySelector("#tinfo .header-category .texto-izq").innerText = product.category;
    document.querySelector("#tinfo .header-category .texto-der").innerText = product.soldCount;
    document.querySelector("thead th.header-name").innerText = product.name;

    // Inicializar el carrusel
    let currentIndex = 0;

    function updateCarousel() {
        imgElement.src = product.images[currentIndex];
    }

    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    });

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
>>>>>>> Stashed changes
        updateCarousel();
    });

    // Inicializa el carrusel al cargar
    updateCarousel();
}
<<<<<<< Updated upstream
=======


document.addEventListener("DOMContentLoaded", function () {
    let productID = localStorage.getItem('selectedProductId');
    if (productID) {
        getProductInfo("https://japceibal.github.io/emercado-api/products/" + productID + ".json");
    } else {
        console.error('No product ID found in local storage');
    }
});
>>>>>>> Stashed changes
