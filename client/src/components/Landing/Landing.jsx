import styles from "./Landing.module.css";
import NavBar from "../NavBar/NavBar";
import Slider from "../Slider/Slider";
import Collage from "../Collage/Collage";
import Footer from "../Footer/Footer";
import heroImg from "../../assets/2.jpg";
import playerImg from "../../assets/1.jpg";
import hostImg from "../../assets/4.jpg";
import Map from "../Map/Map";

const Landing = () => {
  if (window.localStorage) {
    if (window.localStorage.getItem("reload")) {
      localStorage.removeItem("reload");
    } else {
      window.localStorage.setItem("reload", true);
    }
  }
  return (
    <div className={styles.Landing}>
      <NavBar />
      <div className={styles.content}>
        <section className={styles.hero}>
          <h1>Decidete a jugar por mas!</h1>
          <img src={heroImg} alt="" />
        </section>
        <h1>
          "Siempre quiero más. Ya sea que se trate de un gol o de ganar un
          juego, nunca estoy satisfecho"
        </h1>
        <h2>Messi</h2>
        <br />
        <Slider />
        <section className={styles.player}>
          <img src={playerImg} alt="" />
          <div>
            <h2>Reservar una cancha nunca fue tan fácil!</h2>
            <button>Hacelo ya!</button>
          </div>
        </section>
        <Collage />
        <section className={styles.host}>
          <div>
            <h2>
              Busca y reserva en segundos tu cancha favorita, gratis y sin
              complicaciones.{" "}
            </h2>
            <button>Aplicar</button>
          </div>
          <img src={hostImg} alt="" />
        </section>
      </div>
      <Map />
      <br />
      <Footer />
    </div>
  );
};

export default Landing;
