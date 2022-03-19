import React, {useState} from 'react';



const FieldForm = ({handleInput}) => {

    const [field, setField] = useState({})
    //console.log('field is ', field)

    return (
        <div>            
            <select name="players" onChange={(e) => setField({...field, [e.target.name]:e.target.value})}>
                <option value="">tamaño</option>    
                <option value="5">5 a 6</option>    
                <option value="9">7 a 9</option>    
                <option value="11">11</option>    
            </select>        
            <select name="surface"onChange={(e) => setField({...field, [e.target.name]:e.target.value})}>
                <option value="">superficie</option>    
                <option value="cemento">cemento</option>    
                <option value="sintetico">sintético</option>    
                <option value="pasto">césped</option>    
            </select>
            <label htmlFor="price">Precio</label>
            <input type="text" name="price" onChange={(e) => setField({...field, [e.target.name]:e.target.value})}/>        
            <button onClick={(e)=>{
                e.preventDefault()
                handleInput(field)}}>add</button>
        </div>
    );
}

export default FieldForm;
