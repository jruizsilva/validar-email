// Funciones
const iniciarApp = () => {
	resetFormulario();
	cargarEventListeners();
};
const cargarEventListeners = () => {
	window.addEventListener("load", iniciarApp);
	email.addEventListener("blur", validarCampo);
	asunto.addEventListener("blur", validarCampo);
	mensaje.addEventListener("blur", validarCampo);
	btnReset.addEventListener("click", resetFormulario);
	btnSubmit.addEventListener("click", enviarEmail);
};
const validarCampo = (e) => {
	const tagInput = e.target;
	if (e.target.value === "") {
		msjError("Todos los campos son obligatorios", tagInput);
	} else if (e.target.type === "email") {
		if (validarEmail(e.target.value)) {
			bordeVerde(tagInput);
		} else {
			msjError(`Email "${e.target.value}" no es valido`, tagInput);
		}
	} else {
		bordeVerde(tagInput);
	}
	validarCampos(e);
};
const validarEmail = (email) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
};
const bordeRojo = (tagInput) => {
	tagInput.classList.remove("borde-verde");
	tagInput.classList.add("borde-rojo");
};
const bordeVerde = (tagInput) => {
	tagInput.classList.remove("borde-rojo");
	tagInput.classList.add("borde-verde");
};
const msjError = (msj, tagInput = undefined) => {
	if (tagInput !== undefined) {
		bordeRojo(tagInput);
	}
	const div = document.createElement("div");
	div.classList.add("msj-error");
	div.textContent = msj;
	if (main.children[1]) {
		main.removeChild(main.children[1]);
		main.appendChild(div);
	} else {
		main.appendChild(div);
	}
};
const borrarMsjError = () => {
	if (main.children[1]) {
		main.removeChild(main.children[1]);
	}
};
const msjCorrecto = (msj, tagInput = undefined) => {
	if (tagInput !== undefined) {
		bordeVerde(tagInput);
	}
	const div = document.createElement("div");
	div.classList.add("msj-correcto");
	div.textContent = msj;
	main.appendChild(div);
};
const resetFormulario = () => {
	email.classList.remove("borde-verde", "borde-rojo");
	asunto.classList.remove("borde-verde", "borde-rojo");
	mensaje.classList.remove("borde-verde", "borde-rojo");
	email.value = "";
	asunto.value = "";
	mensaje.value = "";
	borrarMsjError();
	disableSubmit();
};
const enableSubmit = () => {
	console.log("enable submit");
	const submit = document.querySelector(".submit-input");
	submit.disabled = false;
	submit.classList.remove("cursor-not-allowed");
	submit.classList.add("cursor-allowed");
	const divSubmit = submit.parentElement;
	divSubmit.classList.remove("opacity-50");
};
const disableSubmit = () => {
	const submit = document.querySelector(".submit-input");
	submit.disabled = true;
	submit.classList.remove("cursor-allowed");
	submit.classList.add("cursor-not-allowed");
	const divSubmit = submit.parentElement;
	divSubmit.classList.add("opacity-50");
};
const validarCampos = (e) => {
	e.preventDefault();
	if (
		validarEmail(email.value) &&
		asunto.value !== "" &&
		mensaje.value !== ""
	) {
		enableSubmit();
		borrarMsjError();
	} else {
		disableSubmit();
	}
};
const enviarEmail = (e) => {
	e.preventDefault();
	if (
		validarEmail(email.value) &&
		asunto.value !== "" &&
		mensaje.value !== ""
	) {
		const divSpinner = document.createElement("div");
		divSpinner.classList.add("spinner");
		main.appendChild(divSpinner);
		setTimeout(() => {
			main.removeChild(main.children[1]);
			msjCorrecto("Mensaje enviado correctamente");
			setTimeout(() => {
				resetFormulario();
			}, 2000);
		}, 1500);
	}
};
// Variables
const main = document.querySelector(".main");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const btnReset = document.querySelector(".reset-input");
const btnSubmit = document.querySelector(".submit-input");

cargarEventListeners();

document.addEventListener("DOMContentLoaded", iniciarApp);
