import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  setHours,
  setMinutes,
  setSeconds,
  addDays,
  subDays,
  isToday,
  format,
} from "date-fns";
import "./style/owner.css";
import FieldCalendar from "../ClubDetail/FieldCalendar/FieldCalendar";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Modal from "./ModalEditarClub/Modal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Owner({ id, name, email, rol }) {
  const navigate = useNavigate();
  const [owner, setOwner] = useState({});
  const [club, setClub] = useState({});
  const [disabled, setDisabled] = useState(false);

  const [openModal, setOpenModal] = useState({
    modal: false,
    club: {},
  });

  useEffect(() => {
    const getOwner = (email) => {
      axios.get(`/owner?email=${email}`).then((res) => setOwner(res.data));
    };
    getOwner(email);
  }, [email]);
  useEffect(() => {
    setClub(owner.Club);
    setDisabled(!owner.authorized);
  }, [setClub, owner.Club]);

  const [selectedDates, setSelectedDates] = useState([]);

  const now = new Date();
  const today = setSeconds(setMinutes(setHours(now, 8), 0), 0);
  const [selectedDay, setSelectedDay] = useState(today);
  const days = [today];
  for (let i = 1; i < 15; i++) {
    days[i] = addDays(today, i);
  }
  const handleNextDay = () => {
    if (selectedDay.toString() === days[days.length - 1].toString()) {
      return;
    } else {
      setSelectedDay((selectedDay) => addDays(selectedDay, 1));
    }
  };

  const handlePrevDay = () => {
    if (selectedDay.toString() === days[0].toString()) {
      return;
    } else {
      setSelectedDay((selectedDay) => subDays(selectedDay, 1));
    }
  };

  const handleCalendar = (e, date, fieldId) => {
    let existent = selectedDates.find(
      (d) => d.time.toString() === date.toString()
    );
    if (!existent) {
      setSelectedDates([...selectedDates, { time: date, field: fieldId }]);

      e.target.classList.add("selected");
    } else {
      setSelectedDates([
        ...selectedDates.filter((d) => d.time.toString() !== date.toString()),
      ]);

      e.target.classList.remove("selected");
    }
  };

  const handleBlock = async () => {
    const toPost = { userId: owner.id, dates: selectedDates };

    const post = await axios.post("/booking", toPost);
    if (post.data.length) window.location.reload();
  };
  const [bookingDetail, setBookingDetail] = useState({
    detail: {},
    show: false,
  });

  const handleInfo = (e, fieldId, booking) => {
    e.preventDefault();
    setBookingDetail({ show: true, detail: { fieldId, booking } });
  };

  const handlerUpdateClub = (club) => {
    setOpenModal({ modal: true, club: club });
    //alert(`Abrir modal, Datos: ${club.name}`);
  };

  const refresh = () => {
    window.location.reload();
  };

  const closeInfo = () => {
    setBookingDetail({ detail: {}, show: false });
  };

  return (
    <div className={styles.Owner}>
      <h1>Bienvenido {name}</h1>

      <div>
        {!owner.Club && (
          <>
            <NavLink to="/createClub">
              <button disabled={disabled}> create club</button>
            </NavLink>
            {disabled && (
              <p>Para crear club, envie email a dueño@canchera.com</p>
            )}
          </>
        )}
      </div>

      {club && (
        <div className={styles.clubData}>
          <h3>Datos de su club </h3>
          <p>Nombre: {club.name}</p>
          <p>Descripción: {club.description}</p>
          <p>Dirección: {`${club.street} ${club.num} ${club.ciudad}`}</p>
          <p>Horario: {`de ${club.openHour} hs a ${club.closeHour} hs`}</p>

          <button onClick={() => handlerUpdateClub(club)}>Editar</button>
          <button onClick={() => refresh()}>Actualizar</button>
        </div>
      )}

      <div>
        <h1>Reservas de sus canchas</h1>
        {bookingDetail.show && (
          <div className="bookingDetail">
            <div>
              <h5>Detalles de reserva</h5>
              <p>Usuario: {bookingDetail.detail.booking.User.name}</p>
              <p>email: {bookingDetail.detail.booking.User.email}</p>
              <p>
                cancha:{" "}
                {club.Fields.findIndex(
                  (field) => field.id === bookingDetail.detail.fieldId
                ) + 1}
              </p>
              <p>
                hora:{" "}
                {new Date(
                  bookingDetail.detail.booking.time
                ).toLocaleDateString() +
                  " " +
                  new Date(
                    bookingDetail.detail.booking.time
                  ).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}

        <div className={styles.calendarControls}>
          <div className="button" onClick={handlePrevDay}>
            <FaChevronLeft />
          </div>
          <p>
            {isToday(selectedDay) ? "Hoy" : selectedDay.toLocaleDateString()}
          </p>
          <div className="button" onClick={handleNextDay}>
            <FaChevronRight />
          </div>
        </div>

        <div className={styles.fields}>
          {club &&
            club.Fields &&
            club.Fields.map((field) => (
              <div className={styles.field}>
                <FieldCalendar
                  day={selectedDay}
                  close={club.closeHour}
                  open={club.openHour}
                  players={field.players}
                  bookings={field.Bookings}
                  price={field.price}
                  handleClick={handleCalendar}
                  handleInfo={handleInfo}
                  fieldId={field.id}
                  surface={field.surface}
                  user="owner"
                />

                <button onClick={handleBlock}>Bloquear horario</button>
              </div>
            ))}
        </div>
      </div>
      {openModal.modal && (
        <Modal club={openModal.club} closeModal={setOpenModal} />
      )}

      {/* <div>
                     <h1>Clubes</h1>
                    {
                        clubes.length && clubes.map((o) =>(   
                            <table id="myTable">
                                <tr className="header">
                                    <th >Name</th>
                                    <th >Descripcion</th>
                                    <th >Location</th>
                                    <th >Ciudad</th>
                                    <th >Horario</th>
                                    <th >Image</th>
                                    <th >Score</th>
                                    <th >Price</th>
                                    <th >Surface</th>
                                    <th >Players</th>
                                </tr>
                                <tr>
                                    <td>{o.name}</td>
                                    <td>{o.description}</td>
                                    <td>{o.location}</td>
                                    <td>{o.ciudad}</td>
                                    <td>{o.openHour} - {o.closeHour}</td>
                                    <td>{o.image}</td>
                                    <td>{o.score}</td>
                                    <td>{o.Fields.price}</td>
                                    <td>{o.Fields.surface}</td>
                                    <td>{o.Fields.players}</td>
                                   
                                </tr>
                                </table>
                        ))
                    }
                    </div> */}
    </div>
  );
}

export default Owner;
