function resetErrorMessages() {
    let errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element)=> {
        element.innerText = "";
    });
}

function displayErrorMessage(elementId, message) {
    let errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
}

function isValidEmail(email) {
    //la estructura que estamos esperando en la expresion regular texto@texto.texto
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.getElementById("logInForm");
            addEventListener("submit", (event)=>{
            //Evitar que se envie el formulario automaticamente
            event.preventDefault();

            //Resetear los mensajes de error
            resetErrorMessages();

            //Validar los campos
            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let password1 = document.getElementById("password").value.trim();
            let isValid = true;

            if (username === "") {
                displayErrorMessage("usernameError", "Por favor ingrese un usuario.");
                isValid = false;
            }
    
            if (!isValidEmail(email)) {
                displayErrorMessage("emailError", "Por favor ingrese un correo electrónico.");
                isValid = false;
            }
    
            if (password1.length < 8) {
                displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
                isValid = false;
            }
    
            if (isValid) {
                // Aquí puedes enviar el formulario si todos los campos son válidos
                alert("¡Formulario enviado correctamente!");
            }

            document.getElementById("logInForm").reset();
    });
    
});