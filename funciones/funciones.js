function consultarTareas() {
    fetch('http://localhost:3000/profesores')
      .then(response => response.json())
      .then(data => cargarTareas(data))
      .catch(error => console.error('Error:', error));
      
}

function cargarTareas(data) {
    let DOM = document.querySelector("#root")
    DOM.appendChild(renderTarea(data))
}

export {consultarTareas}