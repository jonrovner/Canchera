import React, { useEffect } from "react";
import style from "./ListClubs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { get_all_clubes } from "../../redux/action";
import CardClub from "../CardClub/CardClub";

const ListClubs = () => {
  let clubes = useSelector((state) => state.clubes);
  console.log(clubes);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_clubes());
  }, []);

  return (
    <div className={style.contenedor}>
      {clubes.map((c) => (
        <CardClub
          key={c.id}
          name={c.name}
          img={c.image}
          location={c.location}
          openHour={c.openHour}
          closeHour={c.closeHour}
        />
      ))}
    </div>
  );
};

export default ListClubs;
