/* import React from "react";
import { useNavigate } from "react-router";
import style from "./Modal.module.css";

const Modal = ({ closeModal }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button onClick={handleNavigate}> X </button>

        <div className={style.body}>
          <span>Tu contraseña se a actualizado correctamente</span>
        </div>
      </div>
    </div>
  );
};

export default Modal; */

import React from "react";
import style from "./Modal.module.css";
import { Link } from "react-router-dom";

const ModalError = () => {
  return (
    <div className={style.modalContainer}>
      <h2>
        <span>Canchera</span>
      </h2>
      <p>Tu contraseña se a actualizado correctamente.</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default ModalError;
