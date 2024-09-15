function redirigirAInicio() {
    var usuario = document.getElementById("user").value;
    var contraseña = document.getElementById("password").value;

    if (usuario === "" || contraseña === "") {
        alert("Complete los campos");
    } else {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("usuario", usuario);
        window.location.href = "index.html";
    }
}

function verificarSesion() {
    var user = localStorage.getItem("usuario");
    console.log('Usuario en localStorage:', user); 
    if (localStorage.getItem("isLoggedIn") === "true" && user) {
        document.getElementById("user-navbar").textContent = `${user}`;
    } 
    else if (!window.location.pathname.endsWith("/login.html")){
        window.location.href = "login.html";
    } 
}
document.addEventListener("DOMContentLoaded", function() {
    verificarSesion();
});
