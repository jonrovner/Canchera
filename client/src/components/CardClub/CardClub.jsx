import React from "react";
import style from "./CardClub.module.scss";

const CardClub = ({ name, img, location, openHour, closeHour }) => {
  console.log("name: ", name);
  return (
    <div className={style.contenedor}>
      <div className={style.divImg}>
        <img className={style.img} src={img} alt="not found" />
      </div>
      <div className={style.divInfo}>
        <h2>{name}</h2>
        <div className={style.divContenido}>
          <span>{location}</span>
          <span>
            Horario: {openHour}am-{closeHour}pm
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardClub;
