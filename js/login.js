function redirigirAInicio() {
    var usuraio = document.getElementById("user").value;
    var contraseña = document.getElementById("password").value;

    if(usuraio === "" || contraseña === ""){
        alert("Complete los campos");
    } 
    else{
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    }
}

function verificarSesion(){
    if(localStorage.getItem("isLoggedIn") === "true"){
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    verificarSesion()
})