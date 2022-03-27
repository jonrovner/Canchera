import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BotonLogout from "../BotonLogout/BotonLogout";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  let user = useSelector((state) => state.user);
  if (user.name) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // aca ya esta listo para ir a /clubs y filtrar segun lo pedido.
    console.log(input);
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
              onChange={(e) => setInput({ ...input, ciudad: e.target.value })}
              className={styles.ciudad}
              name="ciudad"
              type="text"
              placeholder="CIUDAD"
              value={input.ciudad}
            />
            <input
              onChange={(e) => setInput({ ...input, size: e.target.value })}
              className={styles.size}
              name="size"
              type="number"
              placeholder="TAMAÑO"
              value={input.size}
            />
            <input
              onChange={(e) => setInput({ ...input, clubName: e.target.value })}
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
          <NavLink exact="true" to="/contactUs">
            <p>Contacto</p>
          </NavLink>
        </div>
        <div className={styles.user}>
          {typeof user.email === "string" ? (
            <div>
              <NavLink to="dashboard">Hola {user.name} 👋</NavLink>
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
