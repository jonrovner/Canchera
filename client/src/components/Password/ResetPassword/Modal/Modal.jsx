import React from "react";
import { useNavigate } from "react-router";
import style from "./Modal.module.scss";

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

export default Modal;
