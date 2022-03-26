export const Validate = (prevData) => {
  let errors = {};

  if (prevData.name.length < 1) {
    errors.name = "Nombre es un campo requerido.";
  } else if (prevData.name.length < 3) {
    errors.name = "Nombre debe tener al menos 3 caracteres.";
  }

  //
  //  que es esto nico jjajaja
  //
  /* var emailEnviado = prevData.email;
  var arroba = emailEnviado.indexOf("@");
  var punto = emailEnviado.lastIndexOf(".");
  var extension = emailEnviado.split(".")[1];
  if (prevData.email.length < 1) {
    errors.email = "Email is required";
  } else if (arroba < 1 || punto - arroba < 2 || emailEnviado === "") {
    errors.email = "Email is invalido";
  } else {
    if (extension.length > 3) {
      errors.email = "Email is invalido";
    }
  } */

  let email = prevData.email;
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Email es invalido.";
  }
  if (email.length < 1) errors.email = "Email es un campo requerido.";

  if (prevData.password.length < 1) {
    errors.password = "Contraseña es un campo requerido";
  }

  if (prevData.confirmPassword.length < 1) {
    errors.confirmPassword = "Confirmacion de contraseña requerida.";
  } else if (prevData.password !== prevData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas deben coincidir.";
  }

  return errors;
};
