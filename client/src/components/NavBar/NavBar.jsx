import React from "react";
import { NavLink } from "react-router-dom";
import BotonLogout from "../BotonLogout/BotonLogout";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillMail,
  AiOutlineUser,
  AiFillFileAdd,
  AiOutlineMenu,
} from "react-icons/ai";

import "./NavBar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  let user = useSelector((state) => state.user);
  return (
    <div id="navbar">
      <div>
        <NavLink exact="true" to="/clubs">
          <h3>
            <AiFillHome /> Home
          </h3>
        </NavLink>
      </div>
      <div>
        <NavLink exact="true" to="/contactUs">
          <h3>
            <AiFillMail /> Contact
          </h3>
        </NavLink>
      </div>
      <div>
        <NavLink exact="true" to="/createClub">
          <h3>
            <AiFillFileAdd /> Create Club
          </h3>
        </NavLink>
      </div>
      <div className="search">
        <NavLink to="#">
          <input type="text" placeholder="Buscar" />
          <button>
            <AiOutlineSearch />
          </button>
        </NavLink>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          <AiOutlineMenu />
          <AiOutlineUser />
        </button>
        <div className="dropdown-content">
          {typeof user.email === "string" ? (
            <h3>
              <BotonLogout />
              Hola {user.name}
            </h3>
          ) : (
            <nav>
              <NavLink exact="true" to="/login">
                <h3>
                  <AiOutlineUser /> Login
                </h3>
              </NavLink>

              <NavLink exact="true" to="signup/owner">
                <h3>
                  <AiOutlineUser /> Registrate como Dueño
                </h3>
              </NavLink>
              <NavLink exact="true" to="signup/user">
                <h3>
                  <AiOutlineUser /> Registrate como Jugador
                </h3>
              </NavLink>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
