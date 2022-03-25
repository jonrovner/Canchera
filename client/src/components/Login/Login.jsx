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
import { set_user } from "../../redux/action";
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
        window.localStorage.setItem("user", JSON.stringify(users.data.user));
        let formulario = document.getElementById("formul");
        formulario.reset();
        navigate("/");
      }
    } else {
      setOpenModalError(true);
    }
  };

  const responseGoogle = async (r) => {
    var obj = {
      name: r.profileObj.name,
      email: r.profileObj.email,
      token: r.tokenId,
    };
    let dataGoogle = {
      name: r.profileObj.name.toString(),
      email: r.profileObj.email.toString(),
    };
    let user = await axios.post("/singup/google", dataGoogle);
    window.localStorage.setItem("user", JSON.stringify(obj));
    await dispatch(set_user(user.data));
    navigate("/clubs");
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
            <GoogleLogin
              clientId="78433659675-c72pqgtd1614q2nhb5sqk42f52de5cqg.apps.googleusercontent.com"
              buttonText="Sign In with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </form>
      }
        <button onClick={handlePass}>Olvidaste tu password?</button>
    </div>
  );
};
export default Login;
