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






        // funcion que crea las tarjetas de peliculas
           // Función para crear una tarjeta (card) de película
           function crearTarjetaPelicula(pelicula) {
            // Crear elementos de la tarjeta de película
            // creamos la columna de bootstrap 
            const card = document.createElement('div');
            card.classList.add('pelicula-card');
            // estamos creando la tarjeta
            const cardInner = document.createElement('div');
            cardInner.classList.add('card');
            // creo la imagen de la tarjeta
            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');

            cardImg.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
            cardImg.alt = pelicula.title;
            cardImg.loading = 'lazy';
           

            // creamos el cuerpo de la tarjeta
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('h5');
            cardTitle.textContent = pelicula.title;

             // Añadir elementos a la tarjeta de película
            cardBody.appendChild(cardTitle);
            cardInner.appendChild(cardImg);
            cardInner.appendChild(cardBody);
            // agrego la tarejta a la columna de bootstrap
            card.appendChild(cardInner);

            return card;
        }
        // datos de la api
        const API_SERVER = 'https://api.themoviedb.org/3';
        const options = {
            method: 'GET', // Método de la petición (GET)
            headers: {
                accept: 'application/json', // Tipo de respuesta esperada (JSON)
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
                
            }
        };
        // Función para cargar películas en la seccion del index
        const cargarPeliculas = async (page = 1) => {
            try{
                // Realizamos una petición fetch a la API para obtener las películas populares
                const response = await fetch(`${API_SERVER}/movie/popular?page=${page}`, options);
                console.log(response);
                const data = await response.json(); // Convertimos la respuesta a JSON
                console.log(data);
                const movies = data.results;// Extraemos las películas de la respuesta, array de objetos de peliculas
                console.log(movies);

                const peliculasSection = document.getElementById('peliculasSection');
                peliculasSection.innerHTML = '';// Limpiamos el contenido previo del contenedor
                movies.forEach(movie => {
                    const peliculaCard = crearTarjetaPelicula(movie);// Iteramos sobre las películas
                    peliculasSection.appendChild(peliculaCard);// Añadimos la tarjeta de película al contenedor
                });// Iteramos sobre las películas
            }catch(error){
                console.error(error);
            }
         

        };
      


         // Llamar a la función para agregar las tarjetas de películas cuando el DOM esté cargado
         // document.addEventListener("DOMContentLoaded", agregarTarjetasPeliculas);
         // agregarTarjetasPeliculas();
         document.addEventListener("DOMContentLoaded", () => { cargarPeliculas(1)});
        // cargarPeliculas.addEventListener('click', cargarPeliculas);