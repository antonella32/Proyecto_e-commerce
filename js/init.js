const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [] ; //la usamos como variable global

// Función para actualizar la burbuja de cantidad en el botón del carrito
function actualizarContadorCarrito() {
  const totalItems = listaCarrito.reduce((total, producto) => total + producto.cantidad, 0);
  const cartCount = document.getElementById("cart_count");
  if (cartCount) {
      cartCount.textContent = totalItems;
  }
}



let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
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

