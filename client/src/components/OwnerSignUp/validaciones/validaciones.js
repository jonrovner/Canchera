export const Validate = (prevData) => {
  let errors = {};
  if (prevData.name.length < 1) {
    errors.name = "Name field is required";
  } else if (prevData.name.length < 5) {
    errors.name = "Name field must have 5 characters minimum";
  }

  if (prevData.email.length < 1) {
    errors.email = "Email is required";
  }

  if (prevData.password.length < 1) {
    errors.password = "Password is required";
  }
  return errors;
};
