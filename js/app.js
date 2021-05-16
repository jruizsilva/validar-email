// Funciones
const validarEmail = (email) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
};
const mostrarMsj = (msj) => {
	console.log(msj);
};
// Variables
const formulario = document.querySelector(".form");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const cargarEventListeners = () => {
	email.addEventListener("blur", (e) => {
		const input = e.target;
		if (input.value !== "") {
			if (validarEmail(input.value)) {
				input.classList.remove("borde-rojo");
				input.classList.add("borde-verde");
			} else {
				input.classList.remove("borde-verde");
				input.classList.add("borde-rojo");
				mostrarMsj("El email no es valido");
			}
		} else {
			mostrarMsj("El email esta vacio");
			input.classList.remove("borde-verde");
			input.classList.add("borde-rojo");
		}
	});
	asunto.addEventListener("blur", (e) => {
		const input = e.target;
		if (input.value !== "") {
			input.classList.remove("borde-rojo");
			input.classList.add("borde-verde");
		} else {
			input.classList.remove("borde-verde");
			input.classList.add("borde-rojo");
			mostrarMsj("El asunto no puede estar vacio");
		}
	});
	mensaje.addEventListener("blur", (e) => {
		const input = e.target;
		if (input.value !== "") {
			input.classList.remove("borde-rojo");
			input.classList.add("borde-verde");
		} else {
			input.classList.remove("borde-verde");
			input.classList.add("borde-rojo");
			mostrarMsj("El mensaje no puede estar vacio");
		}
	});
};
cargarEventListeners();
