import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BotonLogout from "../BotonLogout/BotonLogout";
import { AiOutlineSearch } from "react-icons/ai";
import { cities } from "../createClub/ar";
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { locationFilter, get_all_clubes } from "../../redux/action";

const Navbar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let club = useSelector((state) => state.clubes);
  let filterClub = useSelector((state) => state.filterClubs);
  let user = useSelector((state) => state.user);
  if (user.name) {
    user.name = user.name.split(" ").shift();
    user.name = user.name[0].toUpperCase() + user.name.slice(1);
  }
  const [showCities, setShowCities] = useState(false);
  const [filterCities, setFilterCities] = useState([]);
  const [scrollPosition, setPosition] = useState(0);

  const [input, setInput] = useState({
    ciudad: "",
    size: "",
    clubName: "",
  });

  useEffect(() => {
    if (input.ciudad && input.ciudad.length > 0) {
      setShowCities(true);
    }
    if (!input.ciudad || input.ciudad.length < 1) {
      setShowCities(false);
    }
  }, [input.ciudad]);

  useEffect(() => {
    const findMatch = (word, cities) => {
      const regex = new RegExp(word, "gi");

      setFilterCities(
        cities.filter((place) => {
          return place.city.match(regex);
        })
      );
    };
    if (input.ciudad && input.ciudad.length) {
      findMatch(input.ciudad, cities);
    }
  }, [input.ciudad]);

  useEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
      if (!window.scrollY) {
        setInput({ ...input, clubName: "" });
      }
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, [scrollPosition]);

  const onChange = async (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // aca ya esta listo para ir a /clubs y filtrar segun lo pedido.
    await dispatch(get_all_clubes());
    await dispatch(locationFilter(input));
    navigate("/clubs");
  };

  return (
    <div
      className={
        scrollPosition < 1
          ? styles.Navbar
          : scrollPosition < 3800
          ? styles.Navbar__background
          : styles.Navbar__hidden
      }
    >
      <div className={styles.container}>
        <NavLink exact="true" to="/" className={styles.logo}>
          <h2>Canchera</h2>
        </NavLink>

        <div className={styles.searchBar}>
          <form action="" onSubmit={handleSubmit}>
            <input
              onChange={(e) => onChange(e)}
              className={styles.ciudad}
              name="ciudad"
              type="text"
              placeholder="CIUDAD"
              value={input.ciudad}
              list="cityname"
            />
            {
              <datalist id="cityname">
                {filterCities.length &&
                  showCities &&
                  filterCities
                    .slice(0, 10)
                    .map((city) => <option value={city.city} />)}
              </datalist>
            }
            <input
              onChange={(e) => onChange(e)}
              className={styles.size}
              name="size"
              type="number"
              placeholder="TAMAÑO"
              value={input.size}
            />
            <input
              onChange={(e) => onChange(e)}
              className={styles.clubName}
              name="clubName"
              type="text"
              placeholder="CLUB"
              value={input.clubName}
            />
            <button onSubmit={handleSubmit}>
              <AiOutlineSearch />
            </button>
          </form>
        </div>
        <div className={styles.navLinks}>
          <NavLink exact="true" to="/clubs">
            <p>Establecimientos</p>
          </NavLink>
          <NavLink exact="true" to="/signup/owner">
            <p>Sos Dueño?</p>
          </NavLink>
          <NavLink exact="true" to="/dashboard">
            <p>Dashboard</p>
          </NavLink>
        </div>
        <div className={styles.user}>
          {typeof user.email === "string" ? (
            <div>
              <p>Hola {user.name} 👋</p>
              <BotonLogout />
            </div>
          ) : (
            <nav>
              <NavLink exact="true" to="/login">
                <p>Login</p>
              </NavLink>

              <NavLink exact="true" to="signup/user">
                <p>Registrate</p>
              </NavLink>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
