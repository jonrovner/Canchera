import React, { useMemo, useState } from "react";
import styles from "./UserSignUp.module.css";
import axios from "axios";
import Modal from "./Modal/Modal";
import ModalError from "./Modal/ModalError";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Validate } from "../../utils/Validaciones/validaciones";
import heroIMG from "../../assets/14.jpeg";

import { GoogleLogin } from "react-google-login";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { get_users_email, set_user } from "../../redux/action";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (data.name && data.email && data.password && data.confirmPassword) {
      let existe = await axios.post("/signup/user", data);

      if (!existe.data.error) {
        setOpenModal(true);
        let formulario = document.getElementById("formul");
        formulario.reset();
      } else {
        setOpenModalError(true);
      }
    } else {
      setOpenModalError(true);
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.name || error.email || error.password || error.confirmPassword) {
      return true;
    }

    return false;
  }, [error]);

  const responseGoogle = async (r) => {
    let dataGoogle = {
      name: r.profileObj.name.toString(),
      email: r.profileObj.email.toString(),
    };
    let existe = await axios.post("/singup/google", dataGoogle);
    if (!existe.data.message) {
      window.localStorage.setItem("user", JSON.stringify(existe.data.email));
      await dispatch(set_user(existe.data));
      navigate("/clubs");
      let formulario = document.getElementById("formul");
      formulario.reset();
    } else {
      let usuario = await axios.get(`/user?email=${r.profileObj.email}`);
      await dispatch(get_users_email(r.profileObj.email));
      await dispatch(set_user(usuario.data));
      window.localStorage.setItem("user", JSON.stringify(usuario.data.email));
      navigate("/clubs");
    }
  };

  return (
    <div className={styles.SignUp}>
      {openModal && <Modal closeModal={setOpenModal} />}
      {openModalError && <ModalError closeModal={setOpenModalError} />}
      <div className={styles.diagonalPattern}></div>
      <div className={styles.dotPattern}></div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <img src={heroIMG} alt="" />

          <div className={styles.form}>
            <form
              id="formul"
              className={styles.signInForm}
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <h2 className={styles.title}>
                Juga en <Link to="/">Canchera</Link>
              </h2>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <FaUserAlt />
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.name && <p className={styles.error}>{error.name}</p>}
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <MdEmail />
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.email && <p className={styles.error}>{error.email}</p>}
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <RiLockPasswordFill />
                  </div>
                  <input
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.password && (
                    <p className={styles.error}>{error.password}</p>
                  )}
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <RiLockPasswordFill />
                  </div>
                  <input
                    autoComplete="off"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirmar contraseña"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.confirmPassword && (
                    <p className={styles.error}>{error.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className={styles.buttons}>
                <input
                  type="submit"
                  className={styles.boton}
                  disabled={disabeledSubmit}
                  value="Registrarse"
                />

                <p className={styles.socialText}>
                  O inicia con tu red social favorita
                </p>
                <div className={styles.socialMedia}>
                  <GoogleLogin
                    clientId="78433659675-c72pqgtd1614q2nhb5sqk42f52de5cqg.apps.googleusercontent.com"
                    buttonText="Registrarse con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;

/* import React, { useMemo, useState } from "react";
import styles from "./UserSignUp.module.css";
import axios from "axios";
import { Validate } from "../../utils/Validaciones/validaciones";
import Modal from "./Modal/Modal";
import ModalError from "./Modal/ModalError";
import { GoogleLogin } from "react-google-login";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { get_users_email, set_user } from "../../redux/action";

const UserSignUp = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let user = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (data.name && data.email && data.password && data.confirmPassword) {
      let existe = await axios.post("/signup/user", data);
      if (!existe.data.error) {
        setOpenModal(true);
        let formulario = document.getElementById("formul");
        formulario.reset();
      } else {
        setOpenModalError(true);
      }
    } else {
      setOpenModalError(true);
    }
  };

  const responseGoogle = async (r) => {
    let dataGoogle = {
      name: r.profileObj.name.toString(),
      email: r.profileObj.email.toString(),
    };
    let existe = await axios.post("/singup/google", dataGoogle);
    if (!existe.data.message) {
      window.localStorage.setItem("user", JSON.stringify(existe.data.email));
      await dispatch(set_user(existe.data));
      navigate("/clubs");
      let formulario = document.getElementById("formul");
      formulario.reset();
    } else {
      let usuario = await axios.get(`/user?email=${r.profileObj.email}`);
      await dispatch(get_users_email(r.profileObj.email));
      await dispatch(set_user(usuario.data));
      window.localStorage.setItem("user", JSON.stringify(usuario.data.email));
      navigate("/clubs");
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.name || error.email || error.password || error.confirmPassword) {
      return true;
    }

    return false;
  }, [error]);

  return (
    <div className={styles.contenedor}>
      <form
        id="formul"
        className={styles.signInForm}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h2 className={styles.title}>Register User</h2>
        <div className={styles.inputField}>
          <FaUserAlt className={styles.fasFaUser} />
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => handlerInputChange(e)}
          />
        </div>
        <div className={styles.containerError}>
          {error.name && <p className={styles.error}>{error.name}</p>}
        </div>
        <div className={styles.inputField}>
          <MdEmail className={styles.fasFaUser} />
          <input
            autoComplete="off"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => handlerInputChange(e)}
          />
        </div>
        <div className={styles.containerError}>
          {error.email && <p className={styles.error}>{error.email}</p>}
        </div>
        <div className={styles.inputField}>
          <RiLockPasswordFill className={styles.fasFaUser} />
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handlerInputChange(e)}
          />
        </div>
        <div className={styles.containerError}>
          {error.password && <p className={styles.error}>{error.password}</p>}
        </div>
        <div className={styles.inputField}>
          <RiLockPasswordFill className={styles.fasFaUser} />
          <input
            autoComplete="off"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => handlerInputChange(e)}
          />
        </div>
        <div className={styles.containerError}>
          {error.confirmPassword && (
            <p className={styles.error}>{error.confirmPassword}</p>
          )}
        </div>
        <div>
          <input
            type="submit"
            className={styles.boton}
            disabled={disabeledSubmit}
            value="Register"
          />
          {openModal && <Modal closeModal={setOpenModal} />}
          {openModalError && <ModalError closeModal={setOpenModalError} />}
        </div>
        <p className={styles.socialText}>O inicia con tu red social favorita</p>
        <div className={styles.socialMedia}>
          <GoogleLogin
            clientId="78433659675-c72pqgtd1614q2nhb5sqk42f52de5cqg.apps.googleusercontent.com"
            buttonText="Sign In with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    </div>
  );
};

export default UserSignUp; */
