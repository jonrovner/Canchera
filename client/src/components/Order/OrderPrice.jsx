import React from "react";
import style from "./OrderPrice.module.scss";
import { useDispatch } from "react-redux";
import { order_price_clubs } from "../../redux/action";

const OrderPrice = () => {
  const dispatch = useDispatch();

  const handleOrderByFilter = (e) => {
    let orderBy = e.target.value;
    dispatch(order_price_clubs(orderBy));
  };
  return (
    <div className={style.contenedor}>
      <label htmlFor="orderBy">Order By Price:</label>
      <select
        data-testid="select-input"
        className={style.mainSelect}
        id="orderBy"
        onChange={(e) => handleOrderByFilter(e)}
        name="orderBy"
        defaultValue="all"
      >
        <option value="all">Select...</option>
        <option value="lp">Lower Price</option>
        <option value="hp">Higher Price</option>
      </select>
    </div>
  );
};

export default OrderPrice;
