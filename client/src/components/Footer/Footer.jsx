import React from "react";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.video}>
        <h2>
          ACA PONER VIDEO, igual al footer de{" "}
          <a href="https://celebreak.eu/">celebreak.eu</a>
        </h2>
      </div>
      <div className={styles.content}>
        <div>
          <h2>LOGO</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
            distinctio?
          </p>
        </div>
        <div>
          <h4>Seguinos en:</h4>
          <ul>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaFacebookSquare />
            </li>
            <li>
              <FaLinkedin />
            </li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li>
              <FaMapMarkerAlt /> Goya, en la casa de Martin.
            </li>
            <li>
              <FaPhoneAlt /> +54 9 123 456-678
            </li>
            <li>
              <FaEnvelope /> contacto@canchera.com
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Que es Canchera?</li>
            <li>Contactanos!</li>
            <li>Quienes somos</li>
            <li>FAQ</li>
            <li>Mapa de Sitio</li>
          </ul>
        </div>
      </div>
      <small>© Copyright 2022 Canchera. Todos los derechos reservados.</small>
    </div>
  );
};

export default Footer;
