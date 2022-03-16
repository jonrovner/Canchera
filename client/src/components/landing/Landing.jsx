import React from "react";
import styles from "./Landing.module.css";
import NavBar from "../NavBar/NavBar";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";

const Landing = () => {
  return (
    <div className={styles.Landing}>
      <NavBar />
      <section>Hero section</section>
      <Slider />
      <section>Jugador section</section>
      <section>fotos varias + info</section>
      <section>host section</section>
      <Footer />
    </div>
  );
};

export default Landing;
