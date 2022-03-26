export const Validate = (prevData) => {
  let errors = {};

  let email = prevData.email;
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.email = "Email es invalido.";
  }
  if (email.length < 1) errors.email = "Email es un campo requerido.";

  if (prevData.password.length < 1) {
    errors.password = "Contraseña es un campo requerido";
  }
  return errors;
};
