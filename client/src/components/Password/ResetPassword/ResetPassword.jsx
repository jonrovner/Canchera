import axios from "axios";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import { RiLockPasswordFill } from "react-icons/ri";
import style from "./ResetPassword.module.scss";

const ResetPassword = () => {
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
    if (data.password !== confirmPassword.confirmPassword) {
      setError("Las contraseñas deben ser iguales");
    } else {
      setError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.password === confirmPassword.confirmPassword && data.password)
      await axios
        .put(`/resetpassword/${token}`, data)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
  };

  const disabeledSubmit = useMemo(() => {
    if (error.length > 0) {
      return true;
    }

    return false;
  }, [error]);

  return (
    <div className={style.contenedor}>
      <form onSubmit={onSubmit} className={style.signInForm}>
        <h1 className={style.title}> Restablecer Contraseña</h1>
        <span>
          Ingresa tu direccion de email en el campo de abajo y te enviaremos un
          link para restablecer tu password
        </span>
        <div className={style.inputField}>
          <RiLockPasswordFill className={style.fasFaUser} />
          <input
            type="password"
            name="password"
            placeholder="Contraseña Nueva"
            onChange={handleOnChange}
          />
        </div>
        <div className={style.inputField}>
          <RiLockPasswordFill className={style.fasFaUser} />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña Nueva"
            onChange={handleChange}
          />
        </div>
        <div className={style.containerError}>
          {error && <p className={style.error}>{error}</p>}
        </div>
        <input
          type="submit"
          value="GUARDAR PASSWORD"
          className={style.boton}
          disabled={disabeledSubmit}
        />
      </form>
    </div>
  );
};
export default ResetPassword;
