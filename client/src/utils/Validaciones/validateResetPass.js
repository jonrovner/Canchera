export const Validate = (prevData) => {
  let errors = {};

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
