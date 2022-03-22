import React, { useState, useMemo } from "react";
import style from "./Login.module.scss";
import axios from "axios";
import Modal from "./Modal/Modal";
import ModalError from "./Modal/ModalError";
import { GoogleLogin } from "react-google-login";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Validate } from "../../utils/validaciones";
import { useDispatch } from "react-redux";
import { get_users_email, set_user } from "../../redux/action";
import { useNavigate } from "react-router";

const Login = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

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
      let users = await axios.post(`/signin`, data);

      if (users.data.hasOwnProperty("msg")) {
        setOpenModalError(true);
      } else {
        dispatch(set_user(users.data.user));

        /* var obj = {
          name: users.data.user.name,
          email: users.data.user.email,
          token: users.data.token,
        }; */
        window.localStorage.setItem("user", JSON.stringify(users.data.user));
        //setOpenModal(true);
        let formulario = document.getElementById("formul");
        formulario.reset();
        navigate("/");
      }
    } else {
      setOpenModalError(true);
    }
  };

  const responseGoogle = async (r) => {
    let existe = await axios.get(
      `/user?email=${r.profileObj.email.toString()}`
    );
    console.log(existe);
    var obj = {
      name: r.profileObj.name,
      email: r.profileObj.email,
      token: r.tokenId,
    };

    if (!existe.data.email) {
      setOpenModalError(true);
    } else {
      window.localStorage.setItem("user", JSON.stringify(obj));
      await dispatch(get_users_email(r.profileObj.name));
      setOpenModal(true);
      let formulario = document.getElementById("formul");
      formulario.reset();
      navigate("/");
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
      {
        <form
          form
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
          <p className={style.socialText}>
            O inicia con tu red social favorita
          </p>
          <div className={style.socialMedia}>
            {/* <a href="#" className={style.socialIcon}>
            <FcGoogle className={style.fabFaGoogle} />
          </a> */}
            <GoogleLogin
              clientId="23495507523-1lcbskoue2o5r1d5bg3705a729nvijsb.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
      }
    </div>
  );
};
export default Login;
