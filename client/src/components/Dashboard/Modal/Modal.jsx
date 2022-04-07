import React from "react";
import { useDispatch } from "react-redux";
import { delete_user } from "../../../redux/action";
import styles from "./Modal.module.css";

const Modal = ({ id, name, closeModal }) => {
  let dispatch = useDispatch();
  const handlerConfirm = async () => {
    await dispatch(delete_user(id));
    window.location.reload();
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.body}>
          <span>Seguro que desea eliminar la cuenta de "{name}"?</span>
          <div className={styles.botones}>
            <button onClick={handlerConfirm}>Confirmar</button>
            <button onClick={() => closeModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
