import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BotonLogout from "../BotonLogout/BotonLogout";
import { AiFillHome, AiOutlineSearch, AiFillMail } from "react-icons/ai";

import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  let user = useSelector((state) => state.user);

  const [scrollPosition, setPosition] = useState(0);

  useEffect(() => {
    function updatePosition() {
      setPosition(window.scrollY);
    }

    window.addEventListener("scroll", updatePosition);
    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <div
      className={
        scrollPosition < 1
          ? styles.Navbar
          : scrollPosition < 3600
          ? styles.Navbar__background
          : styles.Navbar__hidden
      }
    >
      <div className={styles.container}>
        <NavLink exact="true" to="/" className={styles.logo}>
          <h2>Canchera</h2>
        </NavLink>

        <div className={styles.searchBar}>
          <form action="" onSubmit={() => alert("submit")}>
            <input type="text" placeholder="Buscar" />
            <button onSubmit={() => alert("submit")}>
              <AiOutlineSearch />
            </button>
          </form>
        </div>
        <div className={styles.navLinks}>
          <NavLink exact="true" to="/clubs">
            <p>
              <AiFillHome /> Establecimientos
            </p>
          </NavLink>
          <NavLink exact="true" to="/signup/owner">
            <p>
              <AiFillHome /> Sos Dueño?
            </p>
          </NavLink>
          <NavLink exact="true" to="/contactUs">
            <p>
              <AiFillMail /> Contacto
            </p>
          </NavLink>

          <div className={styles.user}>
            {typeof user.email === "string" ? (
              <p>
                <NavLink to="dashboard">Hola {user.name} 👋</NavLink>
                <BotonLogout />
              </p>
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
    </div>
  );
};

export default Navbar;
