import style from "./OrderPrice.module.scss";
import { useDispatch } from "react-redux";
import { locationFilter } from "../../redux/action";

const OrderPrice = () => {
  const dispatch = useDispatch();

  const handleOrderByFilter = (e) => {
    if (e.target.value === "La Rioja") {
      dispatch(locationFilter("La Rioja"));
    } else if (e.target.value === "Goya") {
      dispatch(locationFilter("Goya"));
    } else if (e.target.value === "Tucuman") {
      dispatch(locationFilter("Tucuman"));
    } else if (e.target.value === "Corrientes") {
      dispatch(locationFilter("Corrientes"));
    } else if (e.target.value === "All") {
      dispatch(locationFilter("All"));
    }
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
        <option disabled value="">
          Elegi tu ciudad
        </option>
        <option value="All">Todos los clubes</option>
        <option value="La Rioja">La Rioja</option>
        <option value="Corrientes">Corrientes</option>
        <option value="Tucuman">Tucuman</option>
        <option value="Goya">Goya</option>
      </select>
    </div>
  );
};

export default OrderPrice;
