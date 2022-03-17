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
          <h1>There's been a problem</h1>
        </div>
        <div className={style.body}>
          <span>Wrong Username or Password</span>
        </div>
        <div className={style.footer}>
          <span>Did you forget your password?</span>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
