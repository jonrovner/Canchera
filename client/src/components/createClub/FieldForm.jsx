import React, { useState, useEffect } from "react";
import { validateField } from "./validation";
import styles from "./createClub.module.css";

const FieldForm = ({ handleInput }) => {
  const [valid, setValid] = useState({});
  const [field, setField] = useState({});

  useEffect(() => {
    setValid(validateField(field));
  }, [field]);

  return (
    <div className={styles.crearCancha}>
      <div>
        <label htmlFor="players">Tamaño</label>
        <select
          name="players"
          onChange={(e) =>
            setField({ ...field, [e.target.name]: e.target.value })
          }
        >
          <option value="">tamaño</option>
          <option value="5">5</option>
          <option value="9">9</option>
          <option value="11">11</option>
        </select>
        {!valid.valid && valid.players && (
          <p className={styles.error}>{valid.players}</p>
        )}
      </div>
      <div>
        <label htmlFor="players">Superficie</label>
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
        {!valid.valid && valid.surface && (
          <p className={styles.error}>{valid.surface}</p>
        )}
      </div>
      <div>
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          name="price"
          onChange={(e) =>
            setField({ ...field, [e.target.name]: e.target.value })
          }
        />
        {!valid.valid && valid.price && (
          <p className={styles.error}>{valid.price}</p>
        )}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (valid.valid) {
            handleInput(field);
          }
        }}
      >
        Agregar
      </button>
    </div>
  );
};

export default FieldForm;
