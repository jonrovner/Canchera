import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "./ModalInvitacion/Modal";
import styles from "./Dashboard.module.css";
import axios from "axios";

function User({ id, name }) {
  const userMail = useSelector((state) => state.user).email;
  const [disabled, setDisabled] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`/user?email=${userMail}`).then((res) => setUser(res.data));
  }, [userMail]);

  useEffect(() => {
    if (user.name) {
      if (user.Bookings.length) {
        setBookings(
          user.Bookings.map((b) => {
            return {
              id: b.id,
              ClubName: b.Field.ClubName
                ? b.Field.ClubName
                : "Este club no pertenece mas a Canchera",
              time: new Date(b.time),
              street: b.Field.Club?.street || "",
              num: b.Field.Club?.num || "",
              ciudad: b.Field.Club?.ciudad || "",
              price: b.Field.price,
              surface: b.Field.surface,
              rated: b.rated,
              players: b.Field.players,
            };
          })
        );
      }
    }
  }, [user]);

  const [openModal, setOpenModal] = useState({
    modal: false,
    name: "",
    id: "",
  });

  const handleScore = (bookingId, rating) => {
    axios.put("/booking/score", { bookingId: bookingId, rating: rating });
    setDisabled(true);
  };

  return (
    <div className={styles.User}>
      <h1>Bienvenido {name}</h1>
      <div>
        <h1>Reservas</h1>
        {openModal.modal && (
          <Modal
            id={openModal.id}
            name={openModal.name}
            closeModal={setOpenModal}
          />
        )}
        <table id="myTable">
          <tr className={styles.header}>
            <th>Nombre del Club</th>
            <th>Ubicación</th>
            <th>Dia y Hora</th>
            <th>Precio</th>
            <th>Superficie</th>
            <th>Tamaño</th>
            <th>Acción</th>
          </tr>
          {user &&
            bookings &&
            bookings.map((b) => (
              <tr className={styles.bookings}>
                <td>{b.ClubName}</td>
                <td>{b.street + " " + b.num + ", " + b.ciudad}</td>
                <td>{b.time.toString().split("G").shift()}</td>
                <td>${b.price}</td>
                <td>{b.surface}</td>
                <td>{b.players}</td>
                <td className={styles.actions}>
                  {new Date().getTime() < b.time.getTime() ? (
                    <button
                      onClick={() => {
                        setOpenModal({ modal: true, name: name, id: b.id });
                      }}
                    >
                      Invitar Amigo
                    </button>
                  ) : !b.rated ? (
                    <div className={styles.rating}>
                      <button
                        disabled={disabled}
                        onClick={() => handleScore(b.id, 1)}
                      >
                        1
                      </button>
                      <button
                        disabled={disabled}
                        onClick={() => handleScore(b.id, 2)}
                      >
                        2
                      </button>
                      <button
                        disabled={disabled}
                        onClick={() => handleScore(b.id, 3)}
                      >
                        3
                      </button>
                      <button
                        disabled={disabled}
                        onClick={() => handleScore(b.id, 4)}
                      >
                        4
                      </button>
                      <button
                        disabled={disabled}
                        onClick={() => handleScore(b.id, 5)}
                      >
                        5
                      </button>
                    </div>
                  ) : (
                    <p>Ya puntuado</p>
                  )}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default User;
