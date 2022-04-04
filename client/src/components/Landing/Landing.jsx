import styles from "./Landing.module.css";
import NavBar from "../NavBar/NavBar";
import Slider from "../Slider/Slider";
import Footer from "../Footer/Footer";
import Map from "../Map/Map.jsx";
import Whatsapp from "../Whatsapp/Whatsapp";
import ScrollButton from "../ScrollButton/ScrollButton";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { locationFilter } from "../../redux/action";

const Landing = () => {
  if (window.localStorage) {
    if (window.localStorage.getItem("reload")) {
      localStorage.removeItem("reload");
    } else {
      window.localStorage.setItem("reload", true);
    }
  }

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(locationFilter())
  })

  return (
    <div className={styles.Landing}>
      <NavBar />
      <div className={styles.content}>
        <section className={styles.hero}>
          <div className={styles.images}>
            <img loading="lazy" src={hero} alt="" />
          </div>
          <div className={styles.bgPattern}></div>
          <div className={styles.text}>
            <h1>Decidete a jugar por mas</h1>
            <p>
              Encontra una cancha cercana, reserva y paga OnLine. Olvidate de
              los problemas, aprovecha mas el tiempo de juego con
              <span> Canchera</span>.
            </p>
          </div>
        </section>
        <br />

        <div className={styles.diagonalPattern}></div>
        <section loading="lazy" className={styles.player}>
          <div className={styles.text}>
            <h2>
              Un deporte para <span>TODXS</span>.
            </h2>
            <p>
              Desde un origen, <span>Canchera</span> nace para acompañar y
              apoyar a minorias. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ipsum magnam min
            </p>

            <Link to={"/clubs"}>
              <button>Buscar una cancha</button>
            </Link>
          </div>
        </section>

        <Map />

        <Slider />

        <div className={styles.diagonalPatternDos}></div>
        <section loading="lazy" className={styles.host}>
          <div className={styles.text}>
            <h2>
              <span>Moderniza</span> tu establecimiento.
            </h2>
            <p>
              Tenes un establecimiento o club? Aplica para pertenecer a la
              comunidad
              <span> Canchera</span>, moderniza tu negocio y multiplica tu
              alcance. Utiliza mejor tu tiempo y lleva un control de las
              reservas y canchas.
            </p>
            <Link to={"/signup/owner"}>
              <button>Sumate a Canchera!</button>
            </Link>
          </div>
        </section>
      </div>

      <br />
      <Whatsapp />
      <ScrollButton />
      <Footer />
    </div>
  );
};

export default Landing;
