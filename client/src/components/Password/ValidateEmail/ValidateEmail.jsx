/* import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { passForgotten } from "../../../redux/action";
import { Validate } from "../../../utils/Validaciones/validateEmail";
import style from "./ValidateEmail.module.sass";
import Modal from "./Modal/Modal";
import { MdEmail } from "react-icons/md";

const ValidateEmail = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [data, setData] = useState({
    email: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setError(Validate({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.email) {
      dispatch(passForgotten(data));
      setOpenModal(true);
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.email) {
      return true;
    }

    return false;
  }, [error]);

  return (
    <div className={style.contenedor}>
      <form onSubmit={onSubmit} className={style.signInForm}>
        <h2 className={style.title}> Restablecer Contraseña</h2>
        <span>
          Ingresa tu direccion de email en el campo de abajo y te enviaremos un
          link para restablecer tu password
        </span>
        <span>Direccion de Email</span>
        <div className={style.inputField}>
          <MdEmail className={style.fasFaUser} />
          <input
            className="Input"
            autoComplete="off"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleOnChange}
          />
        </div>
        <div className={style.containerError}>
          {error.email && <p className={style.error}>{error.email}</p>}
        </div>
        <input
          disabled={disabeledSubmit}
          type="submit"
          value="VALIDAR EMAIL"
          className={style.boton}
        />
      </form>
      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default ValidateEmail;
 */

import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { passForgotten } from "../../../redux/action";
import { Validate } from "../../../utils/Validaciones/validateEmail";
import styles from "./ValidateEmail.module.sass";
import Modal from "./Modal/Modal";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const ValidateEmail = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [data, setData] = useState({
    email: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setError(Validate({ ...data, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.email) {
      dispatch(passForgotten(data));
      setOpenModal(true);
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.email) {
      return true;
    }

    return false;
  }, [error]);

  return (
    <div className={styles.ResetPassword}>
      {openModal && <Modal closeModal={setOpenModal} />}
      <div className={styles.dotPattern}></div>
      <div className={styles.image}></div>
      <div className={styles.form}>
        <form onSubmit={onSubmit}>
          <Link to="/">Canchera</Link>
          <div>
            <h3> Restablecer Contraseña</h3>
            <p>
              Ingresa tu email y te enviaremos un link para restablecer tu
              contraseña.
            </p>
          </div>
          <div>
            <div className={styles.inputField}>
              <MdEmail className={styles.fasFaUser} />
              <input
                className="Input"
                autoComplete="off"
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <input
            disabled={disabeledSubmit}
            type="submit"
            value="VALIDAR EMAIL"
            className={styles.boton}
          />
        </form>
      </div>
    </div>
  );
};
export default ValidateEmail;
