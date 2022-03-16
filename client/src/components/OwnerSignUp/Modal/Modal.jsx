import React from "react";
import style from "./Modal.module.scss";

const Modal = ({ closeModal }) => {
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button onClick={() => closeModal(false)}> X </button>
        <div className={style.title}>
          <h1> Are you sure?</h1>
        </div>
        <div className={style.body}>
          <span>Congratulation buddy</span>
        </div>
        <div className={style.footer}>
          <span>need help? 'ayuda'</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
