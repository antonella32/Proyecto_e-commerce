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
}

document.addEventListener("DOMContentLoaded", function() {
    verificarSesion();
});


/*
function redirigirAInicio() {
    var usuario = document.getElementById("user").value;
    var contraseña = document.getElementById("password").value;

    if (usuario === "" || contraseña === "") {
        alert("Complete los campos");
        return; 
    }
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("contraseña", contraseña);

    window.location.href = "index.html";
}

function verificarSesion() {
    var user = localStorage.getItem("usuario");
    console.log('Usuario en localStorage:', user); 

    if (localStorage.getItem("isLoggedIn") === "true" && user) {
        var userNavbar = document.getElementById("user-navbar");
        if (userNavbar) {
            userNavbar.textContent = `Usuario: ${user}`;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    verificarSesion();
    
    if (!localStorage.getItem("usuario") || localStorage.getItem("isLoggedIn") !== "true") {
        if (window.location.pathname !== "/login.html") {
            window.location.href = "login.html";
        }
    }
});