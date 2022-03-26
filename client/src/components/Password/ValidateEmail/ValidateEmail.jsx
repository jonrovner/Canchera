import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { passForgotten } from "../../../redux/action";
import { Validate } from "../../../utils/Validaciones/validateEmail";
import style from "./ValidateEmail.module.scss";
import { MdEmail } from "react-icons/md";

const ValidateEmail = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [data, setData] = useState({
    email: "",
  });

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
    </div>
  );
};

export default ValidateEmail;
