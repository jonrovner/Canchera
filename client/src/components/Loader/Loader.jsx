import React from "react";

import styles from "./Loader.module.css";

function Loader() {
  return (
    <div id="contenedor">
      <div className={styles.loader} id="loader">
        Loading...
      </div>
    </div>
  );
}

export default Loader;
