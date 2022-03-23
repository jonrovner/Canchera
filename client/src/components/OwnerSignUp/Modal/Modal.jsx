import React from "react";
import style from "./Modal.module.scss";

const Modal = ({ closeModal }) => {
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button onClick={() => closeModal(false)}> X </button>
        <div className={style.title}>
          <h1>Bienvenido a Canchera!!!</h1>
        </div>
        <div className={style.body}>
          <span>Se ha enviado un email para confirmar tu cuenta.</span>
        </div>
        <div className={style.footer}>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
