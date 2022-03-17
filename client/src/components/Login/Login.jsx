import React, { useState, useMemo /*  useEffect  */ } from "react";
import style from "./Login.module.scss";
import axios from "axios";
import Modal from "./Modal/Modal";
import ModalError from "./Modal/ModalError";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Validate } from "./validaciones/validaciones.js";

const Login = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handlerInputChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
    setError(Validate({ ...data, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.email && data.password) {
      let users = await axios.post(`http://localhost:3001/signin`, data);

      if (users.data.hasOwnProperty("msg")) {
        setOpenModalError(true);
      } else {
        setOpenModal(true);
        let formulario = document.getElementById("formul");
        formulario.reset();
      }
    } else {
      setOpenModalError(true);
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.email || error.password) {
      return true;
    }

    return false;
  }, [error]);

  return (
    <div className={style.contenedor}>
      <form
        id="formul"
        className={style.signInForm}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h2 className={style.title}>Sign In</h2>

        <div className={style.inputField}>
          <MdEmail className={style.fasFaUser} />
          <input
            autoComplete="off"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => handlerInputChange(e)}
          />
        </div>
        <div className={style.containerError}>
          {error.email && <p className={style.error}>{error.email}</p>}
        </div>

        <div className={style.inputField}>
          <RiLockPasswordFill className={style.fasFaUser} />
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handlerInputChange(e)}
          />
        </div>
        <div className={style.containerError}>
          {error.password && <p className={style.error}>{error.password}</p>}
        </div>

        <div>
          <input
            type="submit"
            className={style.boton}
            disabled={disabeledSubmit}
            value="Sign In"
          />
          {openModal && <Modal closeModal={setOpenModal} />}
          {openModalError && <ModalError closeModal={setOpenModalError} />}
        </div>
        <p className={style.socialText}>O inicia con tu red social favorita</p>
        <div className={style.socialMedia}>
          <a href="#" className={style.socialIcon}>
            <FcGoogle className={style.fabFaGoogle} />
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
