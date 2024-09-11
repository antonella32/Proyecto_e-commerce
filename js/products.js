function getProducts(url){
    return fetch(url)
    .then(respuesta => {
        return respuesta.json();
    })
    .then(lista => {
        showProductsTable(lista.products);
    })
}

function showProductsTable(productsList){
    let productsHtml = "";
    for(let p of productsList){
        productsHtml += `<tr>
                          <td><img src=${p.image}></td>
                          <td>${p.name}</td>
                          <td>${p.description}</td>
                          <td>${p.cost}</td>
                          <td>${p.soldCount}</td>
                       </tr>`;
    }
    document.getElementById("tproducts").innerHTML = productsHtml;
}

document.addEventListener("DOMContentLoaded",function(){
    let catID = localStorage.getItem("catID")
    getProducts("https://japceibal.github.io/emercado-api/cats_products/" + catID + ".json");
});

