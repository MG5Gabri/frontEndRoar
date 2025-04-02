let DOM = document.querySelector("#root");

// Función para iniciar sesión
function iniciarSesion(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const id_grado = document.getElementById('id_grado').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, id_grado })
    })
    .then(response => response.json())
    .then(data => {
        const mensaje = document.getElementById('mensaje');
        if (data.success) {
            document.getElementById('loginForm').style.display = 'none'; // Oculta el formulario
            mensaje.innerText = `✅ Bienvenido, ${data.profesor.nombre_profesor} - ${data.profesor.nombre_grado}`;
            mensaje.style.color = 'green';

            // Muestra el contenedor del profesor y el grado
            DOM.appendChild(mostrarContenedor(data.profesor.nombre_profesor, data.profesor.nombre_grado, data.alumnos));

        } else {
            mensaje.innerText = '❌ Credenciales incorrectas';
            mensaje.style.color = 'red';
        }
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('loginForm').addEventListener('submit', iniciarSesion);


// Función para mostrar el contenedor con el profesor, grado y alumnos
function mostrarContenedor(nombreProfesor, nombreGrado, alumnos) {
    let contenedor = document.createElement('div');
    contenedor.className = "contenedor";

    let nombre_Usuario = document.createElement('div');
    nombre_Usuario.className = "divUsuario";
    nombre_Usuario.innerText = `👨‍🏫 Profesor: ${nombreProfesor}`;
    contenedor.appendChild(nombre_Usuario);
    
    let nombre_Grado = document.createElement('div');
    nombre_Grado.className = "divGrado";
    nombre_Grado.innerText = `📚 Grado: ${nombreGrado}`;
    contenedor.appendChild(nombre_Grado);

    // Sección de alumnos
    let alumnosContainer = document.createElement('div');
    alumnosContainer.className = "alumnosContainer";
    
    let tituloAlumnos = document.createElement('h3');
    tituloAlumnos.innerText = "📋 Lista de Alumnos";
    alumnosContainer.appendChild(tituloAlumnos);

    alumnos.forEach(alumno => {
        let divAlumno = document.createElement('div');
        divAlumno.className = "alumno";
        divAlumno.innerText = `👦 ${alumno.nombre}`;
        alumnosContainer.appendChild(divAlumno);
    });

    contenedor.appendChild(alumnosContainer);
    return contenedor;
}