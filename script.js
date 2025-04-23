//Trabajo Práctico: Crear una aplicación web en la que el usuario pueda registrar tareas, su prioridad y categoría, la cual debe ser seleccionada desde un listado predeterminado.
// Las tareas deben mostrarse en orden de su prioridad y se deben poder filtrar por categoría.
// Las tareas deben poder cambiar de estado entre “pendiente” (estado inicial), “en proceso” y “finalizado”. También se deben poder eliminar.

class tareas {
    constructor(nombre, prioridad, categoria) {
        this.nombre = nombre;
        this.prioridad = prioridad;
        this.categoria = categoria;
        this.estado = "pendiente";
    }
}

function crearTarea(){
    const nombre = document.getElementById("nombre").value;
    const prioridad = document.getElementById("prioridad").value;
    const categoria = document.getElementById("categoria").value;

    if (nombre === "" || prioridad === "" || categoria === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevaTarea = new tareas(nombre, prioridad, categoria);
    agregarTarea(nuevaTarea);
}

function agregarTarea(tarea) {
    const listaTareas = document.getElementById("tareas"); 
    const li = document.createElement("li");
    li.classList.add("tarea-item"); 

    li.setAttribute("data-prioridad", tarea.prioridad.toLowerCase());
    li.setAttribute("data-categoria", tarea.categoria.toLowerCase());

    li.innerHTML = `
        <span>${tarea.nombre}</span>
        <div class="acciones-tarea">
            <span class="estado-circulo" style="color: yellow; cursor: pointer;" title="Cambiar estado">🟡 pendiente</span>
            <span class="tacho-eliminar" style="color: red; cursor: pointer; margin-left: 10px;" title="Eliminar tarea">🗑️</span>
        </div>
    `;

    const estadoCirculo = li.querySelector(".estado-circulo");
    estadoCirculo.onclick = function () {
        if (tarea.estado === "pendiente") {
            tarea.estado = "en proceso";
            estadoCirculo.textContent = "🟠 en proceso";
        } else if (tarea.estado === "en proceso") {
            tarea.estado = "finalizado";
            estadoCirculo.textContent = "🔴 finalizado";
        } else {
            tarea.estado = "pendiente";
            estadoCirculo.textContent = "🟡 pendiente";
        }
    };

    const tachoEliminar = li.querySelector(".tacho-eliminar");
    tachoEliminar.onclick = function () {
        listaTareas.removeChild(li);
    };

    listaTareas.appendChild(li);

    // Llama a mostrarDetalleTarea para asignar el evento onclick
    mostrarDetalleTarea();
}

function mostrarForm() {
    const form = document.getElementById("form-tareas"); 
    form.classList.remove("oculto");
    form.classList.add("visible");
}

function ocultarForm() {
    const form = document.getElementById("form-tareas"); 
    form.classList.remove("visible");
    form.classList.add("oculto");
}

function filtrarTareas() {
    const prioridad = document.getElementById('f-prioridad').value;
    const categoria = document.getElementById('f-categoria').value;

    const tareas = document.querySelectorAll('.tarea-item');
    tareas.forEach(tarea => {
        const tareaPrioridad = tarea.getAttribute('data-prioridad');
        const tareaCategoria = tarea.getAttribute('data-categoria');

        if (
            (prioridad === 'todas' || tareaPrioridad === prioridad) &&
            (categoria === 'todas' || tareaCategoria === categoria)
        ) {
            tarea.style.display = 'flex';
        } else {
            tarea.style.display = 'none';
        }
    });
}

function mostrarDetalleTarea() {
    const tareas = document.querySelectorAll('.tarea-item');
    const contenedorDetalle = document.getElementById('contenedor-detalle');

    tareas.forEach(tarea => {
        tarea.onclick = function(event) {
            // Evitar que el clic en los botones de estado o eliminar abra el detalle
            if (event.target.classList.contains('estado-circulo') || 
                event.target.classList.contains('tacho-eliminar')) {
                return;
            }
            
            const tareaNombre = tarea.querySelector('span').textContent.trim();
            const tareaPrioridad = tarea.getAttribute('data-prioridad');
            const tareaCategoria = tarea.getAttribute('data-categoria');
            const tareaEstado = tarea.querySelector('.estado-circulo').textContent.split(' ')[1];

            contenedorDetalle.innerHTML = `
                <h3>Detalle de la Tarea</h3>
                <p><strong>Nombre:</strong> ${tareaNombre}</p>
                <p><strong>Prioridad:</strong> ${tareaPrioridad.charAt(0).toUpperCase() + tareaPrioridad.slice(1)}</p>
                <p><strong>Categoría:</strong> ${tareaCategoria.charAt(0).toUpperCase() + tareaCategoria.slice(1)}</p>
                <p><strong>Estado:</strong> ${tareaEstado}</p>
                <button id="btn-cerrar-detalle" title="Cerrar detalle">✕</button>
            `;
            contenedorDetalle.classList.remove('oculto');
            contenedorDetalle.classList.add('visible');
            
            // Agregar evento al botón de cerrar
            document.getElementById('btn-cerrar-detalle').addEventListener('click', cerrarDetalle);
        };
    });
}

function cerrarDetalle() {
    const contenedorDetalle = document.getElementById('contenedor-detalle');
    contenedorDetalle.classList.remove('visible');
    contenedorDetalle.classList.add('oculto');
}

document.getElementById('tareas').addEventListener('DOMNodeInserted', mostrarDetalleTarea);

