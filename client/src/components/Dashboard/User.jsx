import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./ModalInvitacion/Modal";
import styles from "./Dashboard.module.css";

function User({ id, name }) {
  const user = useSelector((state) => state.user);
  let boo = user.Bookings;

  const [openModal, setOpenModal] = useState({
    modal: false,
    name: "",
    id: "",
  });

  return (
    <div>
      <h1>Bienvenido {name}</h1>
      <div>
        <h1>Reservas</h1>
        <table id="myTable">
          <tr className={styles.header}>
            <th>Club Name</th>
            <th>Location</th>
            <th>Time</th>
            <th>Price</th>
            <th>Surface</th>
            <th>Sharpe</th>
          </tr>
          {user &&
            boo.length &&
            boo.map((b) => (
              <tr>
                <td>{b.Field.ClubName}</td>
                <td>{b.Field.Club.location}</td>
                <td>{b.time}</td>
                <td>{b.Field.price}</td>
                <td>{b.Field.surface}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpenModal({ modal: true, name: name, id: id });
                    }}
                  >
                    Sharpe
                  </button>
                </td>
              </tr>
            ))}
          {openModal && (
            <Modal
              id={openModal.id}
              name={openModal.name}
              closeModal={setOpenModal}
            />
          )}
        </table>
      </div>
    </div>
  );
}

export default User;
