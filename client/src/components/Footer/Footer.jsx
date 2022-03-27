import React from "react";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.video}>
        <iframe
          title="video"
          height="120%"
          src="https://player.vimeo.com/video/291893941?h=b268c1e346&muted=1&autoplay=1&loop=1&transparent=0&background=1&controls=0"
          frameBorder="0"
          allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
        ></iframe>
      </div>
      <div className={styles.content}>
        <div className={styles.logo}>
          <h2>Canchera</h2>
          <p>Uniendo jugadorxs y canchas, mas facil que nunca.</p>
        </div>
        <div className={styles.social}>
          <h4>Seguinos en</h4>
          <ul>
            <Link to={"#"}>
              <li>
                <FaInstagram />
              </li>
            </Link>
            <Link to={"#"}>
              <li>
                <FaFacebookSquare />
              </li>
            </Link>
            <Link to={"#"}>
              <li>
                <FaLinkedin />
              </li>
            </Link>
          </ul>
        </div>
        <div className={styles.contact}>
          <h4>Contacto</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> Goya, Corrientes.
            </li>
            <li>
              <FaEnvelope /> contacto@canchera.com
            </li>
          </ul>
        </div>
        <div className={styles.info}>
          <h4>Mas info</h4>
          <ul>
            <Link to={"#"}>
              <li>Que es Canchera?</li>
            </Link>
            <Link to={"#"}>
              <li>Como ser Dueño</li>
            </Link>
            <Link to={"#"}>
              <li>FAQ</li>
            </Link>
          </ul>
        </div>
      </div>
      <small>
        © Copyright 2022 <span>Canchera</span>. Todos los derechos reservados.
      </small>
    </div>
  );
};

export default Footer;
