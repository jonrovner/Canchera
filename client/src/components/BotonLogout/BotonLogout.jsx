import React from "react";
import { useDispatch } from "react-redux";
import { clear_state_user } from "../../redux/action";
import style from "./BotonLogout.module.sass";

const BotonLogout = () => {
  let dispatch = useDispatch();
  const handleLogout = async () => {
    let desconectandose = localStorage.getItem("user");
    const desconectado = JSON.parse(desconectandose);
    dispatch(clear_state_user(desconectado.email));
    console.log(desconectado.email);
    window.localStorage.clear();
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
