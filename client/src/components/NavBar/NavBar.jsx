import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BotonLogout from "../BotonLogout/BotonLogout";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { locationFilter } from "../../redux/action";

const Navbar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  if (user.name) {
    user.name = user.name.split(" ").shift();
    user.name = user.name[0].toUpperCase() + user.name.slice(1);
  }

  const [scrollPosition, setPosition] = useState(0);

  const [input, setInput] = useState({
    ciudad: "",
    size: "",
    clubName: "",
  });

  useEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const onChange = async (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // aca ya esta listo para ir a /clubs y filtrar segun lo pedido.
    console.log(input);
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
            />
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
