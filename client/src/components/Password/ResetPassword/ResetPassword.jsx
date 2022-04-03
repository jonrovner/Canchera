import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./ResetPassword.module.sass";
import Modal from "./Modal/Modal";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const { token } = useParams();
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState({
    confirmPassword: "",
  });
  const [data, setData] = useState({
    password: "",
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setConfirmPassword({
      ...confirmPassword,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.password === confirmPassword.confirmPassword && data.password)
      await axios
        .put(`/resetpassword/${token}`, data)
        .catch((error) => console.log(error));
    setOpenModal(true);
  };

  useEffect(() => {
    if (data.password !== confirmPassword.confirmPassword) {
      setError("Las contraseñas deben ser iguales");
    } else {
      setError("");
    }
  }, [data, confirmPassword]);

  const disabeledSubmit = useMemo(() => {
    if (error.length === 0) {
      return false;
    }

    return true;
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
            <p>Ingrese una nueva contraseña, y repitala para confirmar.</p>
          </div>
          <div>
            <div className={styles.inputField}>
              <RiLockPasswordFill className={styles.fasFaUser} />
              <input
                required
                type="password"
                name="password"
                placeholder="Contraseña nueva"
                onChange={handleOnChange}
              />
            </div>
            <div className={styles.inputField}>
              <RiLockPasswordFill className={styles.fasFaUser} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                onChange={handleChange}
              />
              <div className={styles.containerError}>
                {error && <p className={styles.error}>{error}</p>}
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Guardar contraseña"
            className={styles.boton}
            disabled={disabeledSubmit}
          />
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
