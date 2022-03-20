import React, { useEffect } from "react";
import style from "./ListClubs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { get_all_clubes } from "../../redux/action";
import CardClub from "../CardClub/CardClub";

import OrderName from "../Order/OrderName";
import OrderPrice from "../Order/OrderPrice";


const ListClubs = () => {
  let clubes = useSelector((state) => state.clubes);

  console.log(clubes);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_clubes());
  }, []);

  return (
    <>

      <OrderName />
      <OrderPrice />

      <div className={style.contenedor}>
        {clubes.map((c) => (
          <CardClub
            key={c.id}
            id={c.id}
            name={c.name}
            img={c.image}
            location={c.location}
            openHour={c.openHour}
            closeHour={c.closeHour}
            Fields={c.Fields}
          />
        ))}
      </div>
    </>
  );
};

export default ListClubs;
