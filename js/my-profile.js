document.addEventListener('DOMContentLoaded', function () {
    //Se crea un objeto con la informacion del perfil
    const profileData = {
        display: {
            name: document.getElementById('display-name'),
            secondName: document.getElementById('display-second-name'), //se crea el objeto display con los que se muestran en pantalla
            lastName: document.getElementById('display-last-name'),
            secondLastName: document.getElementById('display-second-last-name'),
            email: document.getElementById('display-email'),
            phone: document.getElementById('display-phone'),
        },
        input: {
            name: document.getElementById('name'),  //aqui se crea un objeto input con los que se ingresan por el usuario para modificar
            secondName: document.getElementById('secondname'),
            lastName: document.getElementById('last-name'),
            secondLastName: document.getElementById('secondlast-name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
        }
    };

    // Se toman los datos del userProfile del local storage 
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {}; //NO es lo mismo que profiledata

    // Mostrar datos guardados en el div de perfil //con un for mostramos los datos en pantalla
    for (const prop in profileData.display) {  //con este for recorremos todas las propiedades del objeto 
        profileData.display[prop].textContent = savedProfile[prop] || '';
    }

    // con este for se muestra el formulario pre rellenado por si el usuario no quiere cambiar todo
    for (const prop in profileData.input) {
        profileData.input[prop].value = savedProfile[prop] || '';
    }

    // Si ya hay un email guardado, no se puede editar
    if (savedProfile.email) { // Se usa un if para poner la condicion
        profileData.input.email.readOnly = true; // readOnly se usa para que no sea editable
    } // Aquí se cierra el bloque if

    // Función para guardar los datos del form y mostrarlos
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Se usa preventDefault para guardar los datos en local storage sin recargar la pag

        // Se usa la condicion para los campos obligatorios
        if (profileData.input.name.value && profileData.input.lastName.value && profileData.input.email.value) {
            // Se crea un objeto con los datos que fueron ingresados en los fields del formulario
            const userProfile = {
                name: profileData.input.name.value,
                secondName: profileData.input.secondName.value,
                lastName: profileData.input.lastName.value,
                secondLastName: profileData.input.secondLastName.value,
                email: profileData.input.email.value, // El valor de email que después no se puede modificar
                phone: profileData.input.phone.value
            };

            // Se toma el objeto creado userProfile y se pasa a formato JSON y se usa stringify para guardar en el localStorage
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            // Se muestran luego los datos guardados en el div creado para mostrar los datos display
            for (const prop in profileData.display) {   //for recorre todos las prop del objeto
                profileData.display[prop].textContent = userProfile[prop];
            }

            // Ocultar el formulario después de guardar los cambios
            document.getElementById('profile-form').style.display = 'none';

            alert('Se guardaron los datos exitosamente'); // Alerta para mostrar que se guardaron los datos
        } else {
            alert('Complete los campos obligatorios'); // Alerta si falta completar datos obligatorios
        }
    });

    // Manejo del evento para mostrar el formulario al hacer clic en "Editar Información"
    document.getElementById('edit-profileinfo').addEventListener('click', function () {
        var form = document.getElementById('profile-form');
        form.style.display = 'block'; // Muestra el formulario
    });
});

// Cambiar la foto de perfil, almacenándola en el localStorage
document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('profileImageInput');
    const profilePicture = document.getElementById('profile-pic');
    const saveProfileImage = document.getElementById('saveProfileImage');
    const defaultImageSrc = "img/car1.jpg"; // Ruta a la imagen predeterminada

    // Cargar la imagen desde localStorage o usar la predeterminada
    const savedProfileImage = localStorage.getItem('profileImage');
    profilePicture.src = savedProfileImage ? savedProfileImage : defaultImageSrc;

    // Escuchar el cambio en el input de archivo
    profileImageInput.addEventListener('change', () => {
        const file = profileImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicture.src = e.target.result; // Mostrar la imagen seleccionada
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    });

    // Guardar la imagen en localStorage
    saveProfileImage.addEventListener('click', () => {
        const currentSrc = profilePicture.src;
        localStorage.setItem('profileImage', currentSrc);
        alert('¡Imagen de perfil guardada!'); // Alerta para mostrar que se guardó la imagen
    });

    // Abrir el selector de archivos al hacer clic en el botón personalizado
    document.getElementById('customButton').addEventListener('click', function() {
        profileImageInput.click();
    });
});

// Manejo del modo día/noche
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
