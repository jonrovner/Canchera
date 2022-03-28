import React from "react";
import User from "./User";
import Owner from "./Owner";
import Admin from "./Admin";
import { useSelector } from "react-redux";
import styles from "./Dashboard.module.css";

import Navbar from "../NavBar/NavBar";

function Dashboard() {
  const user = useSelector((state) => state.user);

  return (
    <div className={styles.Dashboard}>
      <Navbar />
      <div className={styles.switch}>
        {user.rol === "user" ? (
          <User
            id={user.id}
            name={user.name}
            email={user.email}
            rol={user.rol}
          />
        ) : user.rol === "owner" ? (
          <Owner
            id={user.id}
            name={user.name}
            email={user.email}
            rol={user.rol}
          />
        ) : user.rol === "admin" ? (
          <Admin user={user} />
        ) : (
          <p>Cargando... </p>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
