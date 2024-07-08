document.addEventListener('DOMContentLoaded', async() => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        if(!valideForm()) {
            console.log('El formulario no es valido. Por favor, corrige los errores.');

            return;
        }

       /* if(localStorage.getItem('es_admin') =='N'){
            console.log('No es admin');
            return;
        }*/

        const formData = new FormData(form);

        const peliculaData = {
            id_pelicula : null,
            titulo: formData.get('titulo'),
            fecha_lanzamiento: transformaFecha(formData.get('fecha')),
            genero: formData.get('genero'),
            duracion:formData.get('duracion'),
            director: formData.get('director'),
            reparto: formData.get('reparto'),
            sinopsis: formData.get('sinopsis'),
            imagen: document.getElementById("imagen").files[0].name,

        };


        try {
            const errorMessage = document.getElementById('error-text-login');
            errorMessage.innerText = '';
            const response = await fetch('http://localhost/apisimple/pelicilas.java', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                
                },
                body: JSON.stringify(peliculaData)
            });

            const data = await response.json();

            //da 201
            if (response.ok){
                console.log('Respuesta del servidor:', data);
                if(data.status == 'ok'){
                    console.log('Pelicula grabada correctamente');

                    form.reset();
                }else if (data.status == 'error'){
                    console.log('Error:', data.result.error_msg);
                    errorMessage.innerText = data.result.error_msg;
                }
            }else{{
                console.log('Error:', data.error);
                errorMessage.innerText = 'Error al enviar la solicitud:';
            }}
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    });

    const valideForm = () => {
        let isValid = true;

        isValid = validateField('titulo', 'El titulo es obligatorio') && isValid;

        isValid = validateField('fecha', 'La fecha de lanzamiento es obligatoria') && isValid;

        isValid = validateField('genero', 'El genero es obligatorio') && isValid;

        isValid = validateField('duracion', 'La duración es obligatoria') && isValid;

        isValid = validateField('director', 'El director es obligatorio') && isValid;

        isValid = validateField('reparto', 'El reparto es obligatorio') && isValid;

        isValid = validateField('sinopsis', 'La sinopsis es obligatoria') && isValid;

        isValid = validateField('imagen', 'La imagen es obligatoria') && isValid;

        return isValid;


    };

    const validateFileField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const file = field.file[0];


        const nombreImagen = file.name;
        console.log(nombreImagen);
        if(!file){
            setErrorFor(field, errorMessage);
            return false;
        }else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);

        const value = field.value.trim();

        if(value == ''){
            setErrorFor(field, errorMessage);
            return false;
        }else{
            setSuccessFor(field);
            return true;
        }
    };

    const tabla = document.getElementById('tablaPeliculas');

    const response = await fetch ('http://localhost/apisimple/pelicilas.java', {
        method: 'GET',
        headers: {
            accept:'application/json'
        }
    });

    const data = await response.json();
    const peliculas = data;

    tabla.innerHTML= '';

    peliculas.forEach(pelicula => {
        const row = document.createElement('tr');
        row.innerHTML = '
            <td>${pelicula.id_pelicula}</td>';
    })
    
})