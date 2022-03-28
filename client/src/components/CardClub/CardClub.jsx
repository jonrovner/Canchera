import React from "react";

import { Link } from "react-router-dom";
import style from "./CardClub.module.scss";

const CardClub = ({ id, name, img, location, openHour, closeHour, Fields }) => {
  return (
    <Link
      key={id}
      className={style.link}
      to={`/club/${name.replaceAll(" ", "-")}`}
    >
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
            {Fields?.map((f, i) => (
              <li key={i}>Futbol {f.players}</li>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardClub;
