/* import React from "react";
import style from "./ModalError.module.css";

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
 */

import React from "react";
import { Link } from "react-router-dom";
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
      <p>
        Los datos no coinciden con una cuenta <span>Canchera</span>.
      </p>
      <div>
        <Link to="/forgotPassword">Olvide mi contraseña</Link>
        <Link to="/signup/user">Registrate</Link>
      </div>
    </div>
  );
};

export default ModalError;
