import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clear_state_user } from "../../redux/action";
import style from "./BotonLogout.module.sass";

const BotonLogout = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const handleLogout = async () => {
    let desconectandose = localStorage.getItem("user");
    const desconectado = JSON.parse(desconectandose);
    dispatch(clear_state_user(desconectado.email));
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleLogout} className={style.boton}>
        Log out
      </button>
    </div>
  );
};

export default BotonLogout;
