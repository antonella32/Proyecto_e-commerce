document.addEventListener("DOMContentLoaded", function () {
    const productId = localStorage.getItem("selectedProductId");

    if (productId) {
        // Suponiendo que tienes una API para obtener los detalles del producto basado en el ID
        const productUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

        fetch(productUrl)
            .then(response => response.json())
            .then(product => {
                showProductInfoTable(product);
            })
            .catch(error => {
                console.error("Error al cargar el producto:", error);
            });
    } else {
        console.error("No se encontró el ID del producto en el almacenamiento local.");
    }
});

function showProductInfoTable(product) {
    const productImages = document.querySelector('#productImages');
    const totalImages = product.images.length;

    // Limpiar imágenes previas
    productImages.innerHTML = '';

    // Crear y agregar imágenes al carrusel
    product.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = product.name;
        productImages.appendChild(imgElement);
    });

    // Mostrar descripción y otros detalles
    const descriptionElement = document.querySelector("#tinfo .header-description");
    const categoryElement = document.querySelector("#tinfo .header-category");
    
    if (descriptionElement) {
        descriptionElement.innerHTML = product.description;
    } else {
        console.error("No se encontró el elemento para la descripción.");
    }

    if (categoryElement) {
        categoryElement.querySelector('.texto-izq').innerText = product.category;
        categoryElement.querySelector('.texto-der').innerText = product.soldCount;
    } else {
        console.error("No se encontró el elemento para la categoría.");
    }

    const nameElement = document.querySelector("thead th.header-name");
    if (nameElement) {
        nameElement.innerText = product.name;
    } else {
        console.error("No se encontró el elemento para el nombre.");
    }

    // Función y eventos para pasar las fotos
    let initialIndex = 0; 

    function updateCarousel() {
        const imgElements = productImages.querySelectorAll('img');
        imgElements.forEach((img, index) => {
            img.style.display = index === initialIndex ? 'block' : 'none';
        });
    }

    document.querySelector('.carousel-button.next').addEventListener('click', () => {
        initialIndex = (initialIndex + 1) % totalImages;
        updateCarousel();
    });

    document.querySelector('.carousel-button.prev').addEventListener('click', () => {
        initialIndex = (initialIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    // Inicializa el carrusel al cargar
    updateCarousel();
}
