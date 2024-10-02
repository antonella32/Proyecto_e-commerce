let originalList = []; // 

function getProducts(url) {
    return getJSONData(url)
    .then(result => {
        if (result.status === 'ok') {
            originalList = result.data.products; // accede a los productos desde los datos obtenidos
            listaproducts = originalList; // define listaproducts para usarlo después
            showProductsTable(listaproducts); // muestra los productos en la tabla
        } else {
            console.error('Error al obtener los productos:', result.data); //error si no obtiene los datos
        }
    })
}    

const ORDER_ASC_BY_COST = "asc_cost";   //definimos constantes para cada criterio 
const ORDER_DESC_BY_COST = "desc_cost";
const ORDER_BY_PROD_COUNT = "soldCount";
let listaproducts = [];  //definimos un array vacio para poner los arrays ordenados luego
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
   
function showProductsTable(productsList) {
    let productsHtml = "";
    for (let p of productsList) {
        productsHtml += `<tr data-id="${p.id}">
                            <td><img src="${p.image}" alt="${p.name}"></td>
                            <td>${p.name}</td>
                            <td>${p.description}</td>
                            <td>${p.cost}</td>
                            <td>${p.soldCount}</td>
                        </tr>`;
    }
    document.getElementById("tproducts").innerHTML = productsHtml;
}
//para las siguientes funciones usamos como base a las funciones del archivo categories.js

function sortProducts(criteria, array) {    //Esta funcion es para ordenar a los productos por su costo ascendentemente y descendentemente
    let result = [];  
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) { //tambien ordena por relevancia, es decir, cantidad de vendidos
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;
    listaproducts = sortProducts(currentSortCriteria, [...listaproducts]); 
    showProductsTable(listaproducts);
}   //muestra la tabla con los productos ordenados

function showProductsList() {
    let filteredProducts = listaproducts.filter(product => {
        return (!minCost || parseInt(product.cost) >= minCost) &&
               (!maxCost || parseInt(product.cost) <= maxCost);
    });
    showProductsTable(filteredProducts); //muestra la tabla con los productos filtrados para costo min y max que se ingresen
}

//esta es la parte 1 de la tarea 
document.addEventListener("DOMContentLoaded", function () {
    let catID = localStorage.getItem('catID');
    getProducts("https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json");
    //aca termina la parte 1

//cada boton tiene un evento correspondiente para cuando se le hace click
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    //este es el evento para el boton de limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
        minCost = undefined;
        maxCost = undefined;
        showProductsList();
    });
//evento para el boton de filtrar
    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if (minCost && parseInt(minCost) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if (maxCost && parseInt(maxCost) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList();
    });
});

//evento para el buscador 
document.getElementById("buscador").addEventListener("input", function () {  
    let inputSearch = document.getElementById("buscador").value.toLowerCase(); //esta variable guarda lo que el usuario va ingresando 
                                                                                //y lo convierte a minúscula para que la búsqueda no distinga entre mayúscula y minúscula
    let filteredProducts = originalList.filter(product => {                   
        return product.name.toLowerCase().includes(inputSearch) || //Cambia el nombre y descripcion a minuscula luego, aca includes compara para ver si el inputsearch esta en el nombre
            product.description.toLowerCase().includes(inputSearch);//o en la descripcion
    });
    listaproducts = filteredProducts;
    showProductsTable(filteredProducts);
});
// Se hace un evento para la fila en la que el usuario hace click
document.getElementById("tproducts").addEventListener("click", function (event) {
    // Verifica si el clic fue en una fila <tr>
    let row = event.target.closest("tr");
    if (row) {
        let productId = row.dataset.id;
        localStorage.setItem("selectedProductId", productId); // Guarda el id del producto de esa fila
        window.location.href = "product-info.html";
    }
});
