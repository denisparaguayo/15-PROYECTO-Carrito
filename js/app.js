//variables

const carrito = document.querySelector('#carrito');
const containerCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let total = 0;
let articulosCarrito = [];

//Listeners
cargarEventListener();
function cargarEventListener() {
	//Cuando se presiona agregar carrito
	listaCursos.addEventListener('click', agregarCurso);

	//elimina cursos del carrito
	carrito.addEventListener('click', eliminarCurso);

	//vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		articulosCarrito = [];
		limpiarHTML();
	});
}

//funciones
function agregarCurso(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const cursoSeleccionado = e.target.parentElement.parentElement;
		leerDatosCurso(cursoSeleccionado);
	}
}

//elimina un curso del carrito
function eliminarCurso(e) {
	if (e.target.classList.contains('borrar-curso')) {
		const cursoId = e.target.getAttribute('data-id');
		// elimina el arreglo de articulosCarrito por el data-id
		articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
		carritoHtml();
	}
}
//convertir precio a numero y sumar el valor total del carrito
function sumarTotal() {
	let total = 0;
	articulosCarrito.forEach((curso) => {
		total += Number(curso.precio) * curso.cantidad;
	});
	return total;
}

//lee el contenido del html al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
	//console.log(curso);

	// crear un objeto con la información del curso actual
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1,
	};

	// revisa si un elemento ya existe en el carrito
	const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

	if (existe) {
		//actualizamos la cantidad
		const cursos = articulosCarrito.map((curso) => {
			if (curso.id === infoCurso.id) {
				curso.cantidad++;
				return curso;
			} else {
				return curso;
			}
		});
		articulosCarrito = [...cursos];
	} else {
		//agegar el curso al carrito
		articulosCarrito = [...articulosCarrito, infoCurso];
	}

	carritoHtml();
}

// muestra el carrito en el html
function carritoHtml() {
	//limpia el html
	limpiarHTML();

	//recorre el arreglo de carrito y genera el Html
	articulosCarrito.forEach((curso) => {
		const { imagen, titulo, precio, id, cantidad } = curso;
		const row = document.createElement('tr');
		row.innerHTML = `
        <td> <img src="${imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>

        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

		// agrega el html del carrito en el tbody
		containerCarrito.appendChild(row);
	});

	// insertar el total del carrito en el id total span
	const total = sumarTotal();
	document.querySelector('#total span').textContent = total;

	//recorrer el carrito y contar cantidad de cursos
	let cantidadCursos = 0;
	articulosCarrito.forEach((curso) => {
		cantidadCursos += curso.cantidad;
	});
}
// elimina los cursos del tbody
function limpiarHTML() {
	while (containerCarrito.firstChild) {
		containerCarrito.removeChild(containerCarrito.firstChild);
	}
	eliminarTotal();
}
//eliminar total del valor del carrito
function eliminarTotal() {
	total = 0;
	document.querySelector('#total span').textContent = total;
}
