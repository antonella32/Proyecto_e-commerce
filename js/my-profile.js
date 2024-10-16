document.addEventListener('DOMContentLoaded', function () {
    // Obtener del DOM los datos que se muestran en pantalla 
    const displayName = document.getElementById('display-name');
    const displaySecondName = document.getElementById('display-second-name');
    const displayLastName = document.getElementById('display-last-name');
    const displaySecondLastName = document.getElementById('display-second-last-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');

    // Aca se obtienen los inputs del formulario
    const nameField = document.getElementById('name');
    const secondNameField = document.getElementById('secondname');
    const lastNameField = document.getElementById('last-name');
    const secondLastNameField = document.getElementById('secondlast-name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');

    // Se toman los datos del userprofile del local storage
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    // Mostrar datos guardados en el div de perfil
    displayName.textContent = savedProfile.name || '';
    displaySecondName.textContent = savedProfile.secondName || '';
    displayLastName.textContent = savedProfile.lastName || '';
    displaySecondLastName.textContent = savedProfile.secondLastName || '';
    displayEmail.textContent = savedProfile.email || '';
    displayPhone.textContent = savedProfile.phone || '';


       //Formulario pre-rellenado 
       nameField.value = savedProfile.name || '';
       secondNameField.value = savedProfile.secondName || '';
       lastNameField.value = savedProfile.lastName || '';
       secondLastNameField.value = savedProfile.secondLastName || '';
       emailField.value = savedProfile.email || '';
       phoneField.value = savedProfile.phone || ''; 


    // Si ya hay un email guardado, no se puede editar
    if (savedProfile.email) { // Se usa un if para poner la condicion
        emailField.value = savedProfile.email;
        emailField.readOnly = true; // readOnly se usa para que no sea editable
    } // Aquí se cierra el bloque if

    // Función para guardar los datos del form y mostrarlos
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Se usa preventDefault para guardar los datos en local storage sin recargar la pag

        // Se usa la condicion para los campos obligatorios
        if (nameField.value && lastNameField.value && emailField.value) {
            // Se crea un objeto con los datos que fueron ingresados en los fields del formulario
            const userProfile = {
                name: nameField.value,
                secondName: secondNameField.value,
                lastName: lastNameField.value,
                secondLastName: secondLastNameField.value,
                email: emailField.value, // El valor de email que después no se puede modificar
                phone: phoneField.value
            };

            // Se toma el objeto creado userProfile y se pasa a formato JSON y se usa stringify para guardar en el localStorage
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            // Se muestran luego los datos guardados en el div creado para mostrar los datos display
            displayName.textContent = userProfile.name;
            displaySecondName.textContent = userProfile.secondName;
            displayLastName.textContent = userProfile.lastName;
            displaySecondLastName.textContent = userProfile.secondLastName;
            displayEmail.textContent = userProfile.email;
            displayPhone.textContent = userProfile.phone;

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


//Cambiar la foto de perfil, almacenándola en el localStorage
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
        alert('¡Imagen de perfil guardada!');
    });

    // Abrir el selector de archivos al hacer clic en el botón personalizado
    document.getElementById('customButton').addEventListener('click', function() {
        profileImageInput.click();
    });
});
