
function redirigirAInicio() {
    var usuario = document.getElementById('user').value;
    var contraseña = document.getElementById('password').value;

    if (usuario === '' || contraseña === '') {
      alert('Complete todos los campos');
    } else {
      
      localStorage.setItem('isLoggedIn', 'true');
      
      window.location.href = 'index.html';
    }
  }
  
  function verificarSesion() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      window.location.href = 'index.html';
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    verificarSesion();
  });
  