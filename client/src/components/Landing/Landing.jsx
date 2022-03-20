import React from "react";
import styles from "./Landing.module.css";
import NavBar from "../NavBar/NavBar";
import Slider from "../Slider/Slider";
import Collage from "../Collage/Collage";
import Footer from "../Footer/Footer";
import heroImg from "../../assets/2.jpg";
import playerImg from "../../assets/1.jpg";
import hostImg from "../../assets/4.jpg";
import { useSelector } from "react-redux";

const Landing = () => {
  let user = useSelector((state) => state.user);
  //console.log("state: ", user);

  return (
    <div className={styles.Landing}>
      <NavBar />
      <div className={styles.content}>
        <section className={styles.hero}>
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
          <img src={heroImg} alt="" />
        </section>
        <Slider />
        <section className={styles.player}>
          <img src={playerImg} alt="" />
          <div>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
            <button>Reservar!</button>
          </div>
        </section>
        <Collage />
        <section className={styles.host}>
          <div>
            <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
            <button>Aplicar!</button>
          </div>
          <img src={hostImg} alt="" />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
