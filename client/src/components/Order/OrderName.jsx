import React from "react";
import style from "./OrderName.module.scss";
import { useDispatch } from "react-redux";
import { order_name_clubs } from "../../redux/action";

const Order = () => {
  const dispatch = useDispatch();

  const handleOrderByFilter = (e) => {
    let orderBy = e.target.value;
    dispatch(order_name_clubs(orderBy));
  };

  return (
    <div className={style.contenedor}>
      <label htmlFor="orderBy">Order By Name:</label>
      <select
        data-testid="select-input"
        className={style.mainSelect}
        id="orderBy"
        onChange={(e) => handleOrderByFilter(e)}
        name="orderBy"
        defaultValue="all"
      >
        <option value="all">Select...</option>
        <option value="asc">Clubs from A-Z</option>
        <option value="dsc">Clubs from Z-A</option>
      </select>
    </div>
  );
};

export default Order;
