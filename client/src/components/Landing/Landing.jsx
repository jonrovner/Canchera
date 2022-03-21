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
import Map from "../Map/Map";

const Landing = () => {
  let user = useSelector((state) => state.user);
  //console.log("state: ", user);

  return (
    <div className={styles.Landing}>
      <NavBar />
      <div className={styles.content}>
        <section className={styles.hero}>
          <h1>El fútbol tiene un arraigo particular en la cultura argentina. Su poder es ampliamente movilizador y nos permite generar un espacio participación colectiva, independientemente de su genero.</h1>
          <img src={heroImg} alt="" />
        </section>
        <Slider />
        <section className={styles.player}>
          <img src={playerImg} alt="" />
          <div>
            <h2>¡No más llamados por teléfonos, ni tardar horas en conseguir turnos disponible para practicar tu deporte preferido!</h2>
            <button>Reservar!</button>
          </div>
        </section>
        <Collage />
        <section className={styles.host}>
          <div>
            <h2>La mejor aplicación para reservar canchas. Busca y reserva en segundos tu cancha favorita, gratis y sin complicaciones. Reservar una cancha nunca fue tan fácil!</h2>
            <button>Aplicar!</button>
          </div>
          <img src={hostImg} alt="" />
        </section>
      </div>
      <Map/>
      <br/>
      <Footer />
    </div>
  );
};

export default Landing;
