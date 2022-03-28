import React, { useRef } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import styles from "./Form.module.css";

export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_52nz6js",
        "template_fh2etgs",
        form.current,
        "QB_YGsFz8TqzByi-w"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          alert("Su mensaje no pudo enviarse");
        }
      );
    e.target.reset();
    alert("Mensaje enviado!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Contactenos</h1>
      <form className={styles.formmail} ref={form} onSubmit={sendEmail}>
        <label className={styles.label}>Nombre</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Nombre..."
          name="user_name"
          required
        />

        <label className={styles.label}>Telefono</label>
        <input
          className={styles.input}
          type="tel"
          placeholder="telefono..."
          name="user_tel"
          required
        />

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          placeholder="mail..."
          name="user_email"
        />

        <label className={styles.label}>Mensaje</label>
        <textarea
          className={styles.textarea}
          type="text"
          placeholder="Su mensaje..."
          name="message"
          required
        />

        <input className={styles.button} type="submit" value="Enviar" />
        <br />
        <div>
          <Link to="/">
            <button className={styles.button}>Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
