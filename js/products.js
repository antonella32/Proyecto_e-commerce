
function showAutosTable(autosList) {
    let productsHtml = "";
    for (let p of autosList) {
        productsHtml += `<tr>
                          <td><img src="${p.image}" alt="Imagen de ${p.name}" width="100"></td>
                          <td>${p.name}</td>
                          <td>${p.description}</td>
                          <td>${p.currency} ${p.cost}</td>
                          <td>${p.soldCount}</td>
                       </tr>`;
    }
    document.getElementById("tautos").innerHTML = productsHtml;
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then(function(result) {
            if (result.status === "ok") {
                
                showAutosTable(result.data.products); 
            } else {
                console.error("Error al obtener los datos", result.data);
            }
        });
});