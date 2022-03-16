export const Validate = (prevData) => {
  let errors = {};

  if (prevData.name.length < 1) {
    errors.name = "Name field is required";
  } else if (prevData.name.length < 5) {
    errors.name = "Name field must have 5 characters minimum";
  }

  var emailEnviado = prevData.email;
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
  }

  if (prevData.password.length < 1) {
    errors.password = "Password is required";
  }

  if (prevData.confirmPassword.length < 1) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (prevData.password !== prevData.confirmPassword) {
    errors.confirmPassword = "Password must be the same";
  }

  return errors;
};
