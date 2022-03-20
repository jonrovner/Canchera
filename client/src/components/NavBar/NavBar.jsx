import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineSearch,
  AiFillMail,
  AiOutlineUser,
  AiFillFileAdd,
} from "react-icons/ai";

import "./NavBar.css";

const Navbar = () => {
  return (
    <div id="navbar">
      <div>
        <NavLink exact="true" to="/">
          <h3>
            <AiFillHome /> Home
          </h3>
        </NavLink>
      </div>
      <div>
        <NavLink exact="true" to="/contact">
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
      <div className="login">
        <NavLink exact="true" to="/login">
          <h3>
            <AiOutlineUser /> Login
          </h3>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
