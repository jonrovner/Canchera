import React from "react";

import { Link } from "react-router-dom";
import styles from "./CardClub.module.sass";

const CardClub = ({
  id,
  name,
  img,
  location,
  openHour,
  closeHour,
  Fields,
  score,
}) => {
  return (
    <Link
      key={id}
      className={styles.CardClub}
      to={`/club/${name.replaceAll(" ", "-")}`}
    >
      <div className={styles.contenedor}>
        <div className={styles.divImg}>
          <img className={styles.img} src={img} alt="not found" />
        </div>
        <div className={styles.divInfo}>
          <h2>{name}</h2>
          <div className={styles.divContenido}>
            <p className={styles.location}>{location}</p>
            <div className={styles.data}>
              <p className={styles.hours}>
                Horario: {openHour}am-{closeHour}pm
              </p>
              <p className={styles.fields}>Canchas: {Fields?.length}</p>
              <p className={styles.players}>
                Tamaños:{" "}
                {Fields?.map((f, i) => {
                  return f.players;
                }).join(", ")}
              </p>
            </div>
            <p className={styles.score}>
              {score ? score.toFixed(2) + "⭐" : "Sin calificar"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardClub;
