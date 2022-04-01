import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./ModalInvitacion/Modal";
import styles from "./Dashboard.module.css";

function User({ id, name }) {
  const user = useSelector((state) => state.user);
  let boo = user.Bookings;
  console.log("boo: ", boo);
  boo = boo.map((b) => {
    return {
      id: b.id,
      ClubName: b.Field.ClubName,
      time: new Date(b.time),
      street: b.Field.Club.street,
      num: b.Field.Club.num,
      ciudad: b.Field.Club.ciudad,
      price: b.Field.price,
      surface: b.Field.surface,
    };
  });
  const [openModal, setOpenModal] = useState({
    modal: false,
    name: "",
    id: "",
  });

  const refresh = () => {
    window.location.reload();
  };

  console.log("boo: ", boo);
  return (
    <div>
      <h1>Bienvenido {name}</h1>
      <div>
        <h1>Reservas</h1>
        <button onClick={() => refresh()}>Refresh</button>
        <table id="myTable">
          <tr className={styles.header}>
            <th>Nombre del Club</th>
            <th>Ubicación</th>
            <th>Dia y Hora</th>
            <th>Precio</th>
            <th>Superficie</th>
            <th>Invitar</th>
          </tr>
          {user &&
            boo &&
            boo.map((b) => (
              <tr>
                <td>{b.ClubName}</td>
                <td>{b.street + " " + b.num + ", " + b.ciudad}</td>
                <td>{b.time.toString().split("G").shift()}</td>
                <td>${b.price}</td>
                <td>{b.surface}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpenModal({ modal: true, name: name, id: b.id });
                    }}
                  >
                    Invitar Amigo
                  </button>
                </td>
              </tr>
            ))}
        </table>
        {openModal.modal && (
          <Modal
            id={openModal.id}
            name={openModal.name}
            closeModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
}

export default User;
