function getAutos(url){
    return fetch(url)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(lista => {
            showAutosTable(lista.products);
        })
}


function showAutosTable(autosList){
    let productsHtml = "";
    for(let p of autosList){
        productsHtml += `<tr>
                          <td><img src=${p.image}></td>
                          <td>${p.name}</td>
                          <td>${p.description}</td>
                          <td>${p.cost}</td>
                          <td>${p.soldCount}</td>
                       </tr>`;
    }
    document.getElementById("tautos").innerHTML = productsHtml;
}


document.addEventListener("DOMContentLoaded", function() {
    getAutos("https://japceibal.github.io/emercado-api/cats_products/101.json");
});

