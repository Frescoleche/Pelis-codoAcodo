document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logInForm").addEventListener("submit", (event) => {
        event.preventDefault();
        fieldsValidation();
    });

    document.querySelectorAll(".formControl").forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Tab" || event.key === "Enter") {
                event.preventDefault();
                fieldsValidation();
            }
        });
    });
});

const fieldsValidation = () => {
    resetErrorMessages();
    const name = document.getElementById('lastname').value.trim();
    const password = document.getElementById("password").value.trim();
    const country = document.getElementById('country').value;
    const terms = document.getElementById('terms').checked;
    let isValid = true;

    if (name.length == 0) {
        displayErrorMessage("lastnameError", "Debe completar el nombre");
        document.getElementById("lastname").classList.add("isInvalid");
        isValid = false;
    } else {
        document.getElementById("name").classList.remove('isInvalid');
        document.getElementById("name").classList.add('isValid');
    }

    if (!isValidEmail()) {
        displayErrorMessage("emailError", "Por favor ingrese un correo electrónico válido.");
        document.getElementById("email").classList.add('isInvalid');
        isValid = false;
    } else {
        document.getElementById("email").classList.remove('isInvalid');
        document.getElementById("email").classList.add('isValid');
    }

    if (password.length < 8) {
        displayErrorMessage("passwordError", "La contraseña debe tener al menos 8 caracteres.");
        document.getElementById("password").classList.add("isInvalid");
        isValid = false;
    } else {
        document.getElementById("password").classList.remove("isInvalid");
        document.getElementById("password").classList.add("isValid");
    }

    if (!isValidBorn()) {
        displayErrorMessage("birthError", "El usuario debe tener al menos 16 años.");
        document.getElementById("birth").classList.add('isInvalid');
        isValid = false;
    } else {
        document.getElementById("birth").classList.remove('isInvalid');
        document.getElementById("birth").classList.add('isValid');
    }

    if (country == '') {
        displayErrorMessage("countryError", "Por favor seleccione un país");
        document.getElementById("country").classList.add("isInvalid");
        isValid = false;
    } else {
        document.getElementById("country").classList.remove('isInvalid');
        document.getElementById("country").classList.add('isValid');
    }

    if (!terms) {
        displayErrorMessage("termsError", "Por favor acepte los términos y condiciones.");
        document.getElementById("terms").classList.add('isInvalid');
        isValid = false;
    } else {
        document.getElementById("terms").classList.remove('isInvalid');
        document.getElementById("terms").classList.add('isValid');
    }

    if (isValid) {
        alert("¡Formulario enviado correctamente!");
        document.getElementById('logInForm').reset();
        document.getElementById("lastname").classList.remove('isValid');
        document.getElementById("email").classList.remove('isValid');
        document.getElementById("password").classList.remove('isValid');
        document.getElementById("birth").classList.remove('isValid');
        document.getElementById("country").classList.remove('isValid');
        document.getElementById("terms").classList.remove('isValid');
    }
};

const isValidEmail = () => {
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

const isValidBorn = () => {
    const birthday = document.getElementById('birth').value;
    // chequeo que la fecha sea real 
    if (birthday == ''){
        return false;
    }
    const date = birthday.split("-");
    const day = date[2];
    const month = date[1];
    const year = date[0];
    const actualYear = new Date().getFullYear();
    const monthDays = new Date(year, month, 0).getDate();
    // compruebo que los días no superen a los del mes correspondiente
    if (day > monthDays)
    {
        return false;
    };
    // compruebo que el mes sea válido
    if (month == 0 || month > 12) {
        return false;
    }
    // compruebo que el año sea menor al actual
    if ( year > actualYear) {
        return false;
    }
    // compruebo que el usuario tenga alrededor de 16 años
    if ( year > (actualYear - 16)) {
        return false;
    }
    return true;
}

const displayErrorMessage = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
};

const resetErrorMessages = () => {
    const errorElements = document.querySelectorAll(".errorMessage");
    errorElements.forEach((element) => {
        element.innerText = "";
    });
};