import React from "react";
import style from "./ModalError.module.scss";

const ModalError = ({ closeModal }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => closeModal(false)}> X </button>
        <div className="title">
          <h1>Algo fallo</h1>
        </div>
        <div className="body">
          <span>Revisa algo jaja</span>
        </div>
        <div className="footer">
          <span>need help? 'ayuda'</span>
        </div>
      </div>
    </div>
  );
};

export default ModalError;
