// Funciones
const validarEmail = (email) => {
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
};
const agregarBorde = (tipo, input) => {
	tipo = tipo.toLowerCase();
	if (tipo === "error") {
		input.classList.remove("borde-verde");
		input.classList.add("borde-rojo");
	}
	if (tipo === "correcto") {
		input.classList.remove("borde-rojo");
		input.classList.add("borde-verde");
	}
};
const mostrarMsj = (tipo, msj) => {
	const div = document.createElement("div");
	if (tipo === "error") {
		div.classList.add("msj-error");
		div.textContent = msj;
	}
	if (tipo === "correcto") {
		div.classList.add("msj-correcto");
		div.textContent = msj;
	}

	main.appendChild(div);
	setTimeout(() => {
		main.removeChild(main.children[1]);
	}, 3000);
};
const resetFormulario = () => {
	email.classList.remove("borde-verde", "borde-rojo");
	asunto.classList.remove("borde-verde", "borde-rojo");
	mensaje.classList.remove("borde-verde", "borde-rojo");
	email.value = "";
	asunto.value = "";
	mensaje.value = "";
	bgSubmit();
};
const bgSubmit = () => {
	if (
		validarEmail(email.value) &&
		asunto.value !== "" &&
		mensaje.value !== ""
	) {
		const submit = formulario.querySelector(".submit-input");
		submit.classList.remove("btn-disable");
		submit.classList.add("btn-allowed");
		const divSubmit = submit.parentElement;
		divSubmit.classList.remove("bg-btn-disable");
		divSubmit.classList.add("bg-btn-allowed");
	} else {
		const submit = formulario.querySelector(".submit-input");
		submit.classList.remove("btn-allowed");
		submit.classList.add("btn-disable");
		const divSubmit = submit.parentElement;
		divSubmit.classList.remove("bg-btn-allowed");
		divSubmit.classList.add("bg-btn-disable");
	}
};
const validarCampos = (e) => {
	e.preventDefault();
	if (e.target.classList.contains("submit-input")) {
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
				mostrarMsj("correcto", "Email enviado correctamente");
				setTimeout(() => {
					resetFormulario();
				}, 2000);
			}, 1500);
		} else {
			mostrarMsj("error", "Todos los campos son obligatorios");
		}
	}
};
// Variables
const main = document.querySelector(".main");
const formulario = document.querySelector(".form");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const btnReset = document.querySelector(".reset-input");

const cargarEventListeners = () => {
	window.addEventListener("load", bgSubmit);
	email.addEventListener("blur", (e) => {
		const input = e.target;
		const valueInput = e.target.value;
		if (valueInput === "") {
			agregarBorde("error", input);
			mostrarMsj("error", `El email esta vacio`);
		} else if (!validarEmail(valueInput)) {
			agregarBorde("error", input);
			mostrarMsj("error", `Email "${valueInput}" no es valido`);
		} else {
			agregarBorde("correcto", input);
		}
		bgSubmit();
	});
	asunto.addEventListener("blur", (e) => {
		const input = e.target;
		const valueInput = e.target.value;
		if (valueInput === "") {
			agregarBorde("error", input);
			mostrarMsj("error", "El asunto esta vacio");
		} else {
			agregarBorde("correcto", input);
		}
		bgSubmit();
	});
	mensaje.addEventListener("blur", (e) => {
		const input = e.target;
		const valueInput = e.target.value;
		if (valueInput === "") {
			agregarBorde("error", input);
			mostrarMsj("error", "El mensaje esta vacio");
		} else {
			agregarBorde("correcto", input);
		}
		bgSubmit();
	});
	btnReset.addEventListener("click", resetFormulario);
	formulario.addEventListener("click", validarCampos);
};
cargarEventListeners();
