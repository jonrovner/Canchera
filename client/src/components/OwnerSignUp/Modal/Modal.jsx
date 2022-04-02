/* import React from "react";
import style from "./Modal.module.sass";

const Modal = ({ closeModal }) => {
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button onClick={() => closeModal(false)}> X </button>
        <div className={style.title}>
          <h1>BIENVENIDO A CANCHERA</h1>
        </div>
        <div className={style.body}>
          <span>
            Registrado con exito. Se ha enviado un email para confirmar su
            cuenta.
          </span>
        </div>
        <div className={style.footer}>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Modal; */

import React from "react";
import style from "./Modal.module.css";
import { Link } from "react-router-dom";

const ModalError = ({ closeModal }) => {
  return (
    <div className={style.modalContainer}>
      <h2>
        Bienvenido a <span>Canchera</span>
      </h2>
      <Link to="/login">Login</Link>
      <p>Se ha enviado un email para confirmar su cuenta.</p>
    </div>
  );
};

export default ModalError;
