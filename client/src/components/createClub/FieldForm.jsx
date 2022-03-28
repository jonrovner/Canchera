import React, { useState, useEffect } from "react";
import { validateField } from "./validation";

const FieldForm = ({ handleInput }) => {
  const [valid, setValid] = useState({})
  const [field, setField] = useState({});
 
  useEffect(() => {
    setValid(validateField(field))
    
  }, [field]);

  //console.log('field is ', field)
  


  return (
    <div>
      <div className="validations">
        {!valid.valid && valid.players && <p className="validation">{valid.players}</p>} 
        {!valid.valid && valid.surface && <p className="validation">{valid.surface}</p>} 
        {!valid.valid && valid.price && <p className="validation">{valid.price}</p> }
        </div>

      <select
        name="players"
        onChange={(e) =>
          setField({ ...field, [e.target.name]: e.target.value })
        }
      >
        <option value="">tamaño</option>
        <option value="5">5 a 6</option>
        <option value="9">7 a 9</option>
        <option value="11">11</option>
      </select>
      <select
        name="surface"
        onChange={(e) =>
          setField({ ...field, [e.target.name]: e.target.value })
        }
      >
        <option value="">superficie</option>
        <option value="cemento">cemento</option>
        <option value="sintetico">sintético</option>
        <option value="cesped">césped</option>
      </select>
      <label htmlFor="price">Precio</label>
      <input
        type="number"
        name="price"
        onChange={(e) =>
          setField({ ...field, [e.target.name]: e.target.value })
        }
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          if (valid.valid) {

            handleInput(field);
          }
        }}
      >
        add
      </button>
    </div>
  );
};

export default FieldForm;
