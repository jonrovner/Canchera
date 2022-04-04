import React, { useMemo, useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import ModalError from "./Modal/ModalError";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Validate } from "../../utils/Validaciones/validacionesLogIn";
import heroIMG from "../../assets/6.jpeg";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { get_users_email, set_user } from "../../redux/action";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

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
      let users = await axios.post(`/signin`, data);

      if (users.data.hasOwnProperty("msg")) {
        setOpenModalError(true);
      } else {
        dispatch(set_user(users.data.user));
        window.localStorage.setItem(
          "user",
          JSON.stringify(users.data.user.email)
        );
        let formulario = document.getElementById("formul");
        formulario.reset();
        if (users.data.user.rol === "owner") return navigate("/dashboard");
        if (users.data.user.rol === "user") return navigate("/clubs");
        if (users.data.user.rol === "admin") return navigate("/dashboard");
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
      if (existe.data.rol === "owner") return navigate("/dashboard");
      if (existe.data.rol === "user") return navigate("/clubs");
      if (existe.data.rol === "admin") return navigate("/dashboard");
      let formulario = document.getElementById("formul");
      formulario.reset();
    } else {
      let usuario = await axios.get(`/user?email=${r.profileObj.email}`);
      await dispatch(get_users_email(r.profileObj.email));
      await dispatch(set_user(usuario.data));
      window.localStorage.setItem("user", JSON.stringify(usuario.data.email));
      if (usuario.data.rol === "owner") return navigate("/dashboard");
      if (usuario.data.rol === "user") return navigate("/clubs");
      if (usuario.data.rol === "admin") return navigate("/dashboard");
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.email || error.password) {
      return true;
    }

    return false;
  }, [error]);

  const handlePass = () => {
    navigate("/forgotPassword");
  };

  return (
    <div className={styles.SignUp}>
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
                <Link to="/">Canchera</Link> <br /> Bienvenido!
              </h2>

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

              <div>
                <input
                  type="submit"
                  className={styles.boton}
                  disabled={disabeledSubmit}
                  value="Entrar"
                />
              </div>
              <div className={styles.socialMedia}>
                <GoogleLogin
                  clientId="78433659675-c72pqgtd1614q2nhb5sqk42f52de5cqg.apps.googleusercontent.com"
                  buttonText="Entrar con Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div>
                <button className={styles.resetPasswd} onClick={handlePass}>
                  Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
