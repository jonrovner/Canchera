export const validate = (input) => {

    let valid = {};

    if (!input.name 
    || !input.description 
    || !input.location 
    || !input.openHour
    || !input.closeHour
    || !input.latitude
    || !input.longitude 
    )
    {
     valid.all = 'por favor complete todos los campos'
    }
    if (input.name && input.name.length < 4){
        valid.name = 'debe tener al menos 4 letras'
    }
    if (input.description && input.description.length < 10){
        valid.description = 'intente una descripción más completa'
    }
    if (input.location && typeof(input.location)!=='string'){
        valid.location= 'ingrese una dirección valida'
    }
    if (input.fields && input.fields.length < 1){
        valid.fields= 'debe ingresar al menos una cancha'
    }
    else{
        valid.valid=true
    }
    return valid
}

export const validateField = (field) => {
    console.log('field :', field)
    let valid = {}
    if (!field.players || field.players === ""){
        console.log('players is empty')
        valid.players = 'debe elegir un tamaño'
    }
    if (!field.surface || field.surface === ""){
        console.log('surface is empty')
        valid.surface = 'debe elegir una superficie'
    }
    if (!field.price || field.price === ""){
        console.log('price is empty')
        valid.price = 'debe ingresar un precio válido'
    }
    else {
        console.log('nothing is empty')
        valid.valid = true
    }
    return valid

}