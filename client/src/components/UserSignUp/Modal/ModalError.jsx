import React from "react";
import style from "./ModalError.module.css";

const ModalError = ({ closeModal }) => {
  return (
    <div className={style.modalContainer}>
      <div>
        <h2>Ups!</h2>
        <button className={style.cancelBtn} onClick={() => closeModal(false)}>
          X
        </button>
      </div>
      <p>Ya existe una cuenta asociada a este email.</p>
    </div>
  );
};

export default ModalError;
