document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos del DOM
    const displayName = document.getElementById('display-name');
    const displaySecondName = document.getElementById('display-second-name');
    const displayLastName = document.getElementById('display-last-name');
    const displaySecondLastName = document.getElementById('display-second-last-name');
    const displayEmail = document.getElementById('display-email');
    const displayPhone = document.getElementById('display-phone');

    // Campos del formulario
    const nameField = document.getElementById('name');
    const secondNameField = document.getElementById('secondname');
    const lastNameField = document.getElementById('last-name');
    const secondLastNameField = document.getElementById('secondlast-name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');

    // Cargar datos del almacenamiento local (si existen)
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    // Mostrar datos guardados en el div de perfil
    displayName.textContent = savedProfile.name || '';
    displaySecondName.textContent = savedProfile.secondName || '';
    displayLastName.textContent = savedProfile.lastName || '';
    displaySecondLastName.textContent = savedProfile.secondLastName || '';
    displayEmail.textContent = savedProfile.email || '';
    displayPhone.textContent = savedProfile.phone || '';

    // Prellenar el formulario con los valores actuales
    nameField.value = savedProfile.name || '';
    secondNameField.value = savedProfile.secondName || '';
    lastNameField.value = savedProfile.lastName || '';
    secondLastNameField.value = savedProfile.secondLastName || '';
    phoneField.value = savedProfile.phone || '';

    // Si ya hay un email guardado, hacer que el campo sea de solo lectura (no editable)
    if (savedProfile.email) {
        emailField.value = savedProfile.email;
        emailField.readOnly = true; // El email no se puede modificar
    }

    // Función para guardar y mostrar los datos cuando el formulario se envía
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validar que los campos obligatorios no estén vacíos
        if (nameField.value && lastNameField.value && emailField.value) {
            // Crear un objeto con todos los datos del formulario
            const userProfile = {
                name: nameField.value,
                secondName: secondNameField.value,
                lastName: lastNameField.value,
                secondLastName: secondLastNameField.value,
                email: emailField.value, // El email no se modifica después del primer guardado
                phone: phoneField.value
            };

            // Convertir el objeto a JSON y guardarlo en localStorage
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            // Mostrar los datos guardados en el div de perfil
            displayName.textContent = userProfile.name;
            displaySecondName.textContent = userProfile.secondName;
            displayLastName.textContent = userProfile.lastName;
            displaySecondLastName.textContent = userProfile.secondLastName;
            displayEmail.textContent = userProfile.email;
            displayPhone.textContent = userProfile.phone;

            // Bloquear el campo de email si es la primera vez que se guarda
            if (!savedProfile.email) {
                emailField.readOnly = true;
            }

            // Mostrar un mensaje de éxito
            alert('Datos guardados exitosamente.');
        } else {
            alert('Por favor, completa los campos obligatorios.');
        }
    });
});
