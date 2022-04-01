export const validate = (input) => {
  let valid = {};

  if (
    !input.name ||
    !input.description ||
    !input.openHour ||
    !input.closeHour ||
    !input.latitude ||
    !input.longitude
  ) {
    valid.all = "por favor complete todos los campos";
  }
  if (input.name && input.name.length < 4) {
    valid.name = "debe tener al menos 4 letras";
  }
  if (input.description && input.description.length < 10) {
    valid.description = "una descripción más completa";
  }
  if (input.fields && input.fields.length < 1) {
    valid.fields = "debe ingresar al menos una cancha";
  } else {
    valid.valid = true;
  }
  return valid;
};

export const validateField = (field) => {
  let valid = {
    valid: false,
  };
  if (!field.players || field.players === "") {
    valid.players = "Elegir tamaño";
  }
  if (!field.surface || field.surface === "") {
    valid.surface = "Elegir superficie";
  }
  if (!field.price || field.price === "") {
    valid.price = "Ingrese un precio";
  } else {
    valid.valid = true;
  }
  return valid;
};
