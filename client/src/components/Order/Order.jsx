import React from "react";
import style from "./Order.module.scss";
import { useDispatch } from "react-redux";
import { order_clubs } from "../../redux/action";

const Order = () => {
  const dispatch = useDispatch();

  const handleOrderByFilter = (e) => {
    let orderBy = e.target.value;
    dispatch(order_clubs(orderBy));
  };

  return (
    <div className={style.contenedor}>
      <label htmlFor="orderBy">Order By:</label>
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
