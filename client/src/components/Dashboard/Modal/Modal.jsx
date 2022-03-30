import React from "react";
import { useDispatch } from "react-redux";
import { delete_user } from "../../../redux/action";
import style from "./Modal.module.scss";

const Modal = ({ id, name, closeModal }) => {
  let dispatch = useDispatch();
  const handlerConfirm = async () => {
    await dispatch(delete_user(id));
    alert(`${name} eliminado.`);
    window.location.reload();
  };
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <div className={style.body}>
          <span>Seguro que desea eliminar la cuenta de "{name}"?</span>
          <div className={style.botones}>
            <button onClick={handlerConfirm}>Confirmar</button>
            <button onClick={() => closeModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
