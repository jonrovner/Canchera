import React from "react";
import style from "./ModalError.module.scss";

const ModalError = ({ closeModal }) => {
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button className={style.cancelBtn} onClick={() => closeModal(false)}>
          X
        </button>
        <div className={style.title}>
          <h1>Ocurrio un error</h1>
        </div>
        <div className={style.body}>
          <span>
            Ya existe una cuenta asociada a este email. Por favor, Inicia Sesion
          </span>
        </div>
        <div className={style.footer}>
          <span>need help? 'ayuda'</span>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
