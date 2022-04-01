import React from "react";
import { NavLink } from "react-router-dom";
import BotonLogout from "../BotonLogout/BotonLogout";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./NavBarSinSearch.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  let user = useSelector((state) => state.user);
  if (user.name) {
    user.name = user.name.split(" ").shift();
    user.name = user.name[0].toUpperCase() + user.name.slice(1);
  }

  return (
    <div className={styles.Navbar}>
      <div className={styles.container}>
        <NavLink exact="true" to="/" className={styles.logo}>
          <h2>Canchera</h2>
        </NavLink>

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
