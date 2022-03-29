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
          <span>Se ha enviado un link de confirmacion a su Email.</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
