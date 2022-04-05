import React, { useState, useEffect } from "react";
import FieldCalendar from "./FieldCalendar/FieldCalendar.jsx";
import {
  setHours,
  setMinutes,
  setSeconds,
  addDays,
  subDays,
  isToday,
} from "date-fns";
import { Navigate, useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { get_club_detail } from "../../redux/action/index.js";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styles from "./ClubDetail.module.css";
import axios from "axios";
import NavBar from "../NavBar/NavBarSinSearch";
import Footer from "../Footer/FooterNoVideo";

const Clubdetail = () => {
  //const navigate = useNavigate()
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //carga los detalles del club en el state
  useEffect(() => {
    dispatch(get_club_detail(params.clubName.replaceAll("-", " ")));
  }, [dispatch, params.clubName]);

  const club = useSelector((state) => state.clubDetail);
  const user = useSelector((state) => state.user);
  const position = club.latitude && { lat: club.latitude, lng: club.longitude };
  const [price, setPrice] = useState(0);
  const location =
    club.street + " " + club.num + " " + club.ciudad + " " + club.province;

  // para armar el calendario, creo un array de 14 fechas a partir de hoy
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

  //para armar la reserva
  const [reservationDetail, setReservationDetail] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  useEffect(() => {
    setReservationDetail({ hours: selectedDates.length, price: price });
  }, [selectedDates, price]);

  //cuando el usuario selecciona una hora en el calendar
  const handleHourClick = (e, date, fieldId, fieldPrice) => {
    let existent = selectedDates.find(
      (d) => d.time.toString() === date.toString()
    );
    if (!existent) {
      setSelectedDates([...selectedDates, { time: date, field: fieldId }]);
      setPrice((price) => price + fieldPrice);
      e.target.classList.add("selected");
    } else {
      setSelectedDates([
        ...selectedDates.filter((d) => d.time.toString() !== date.toString()),
      ]);
      setPrice((price) => price - fieldPrice);
      e.target.classList.remove("selected");
    }
  };

  //on submit
  const handleReservation = async () => {
    if (typeof user.email === "string") {
      try {
        const mpResponse = await axios.post("/checkout", { price });

        if (mpResponse.data.id) {
          const bookingDetails = {
            toPost: { userId: user.id, dates: selectedDates },
            payment_id: mpResponse.data.id,
          };

          window.localStorage.setItem(
            "booking_details",
            JSON.stringify(bookingDetails)
          );
          createCheckoutButton(mpResponse.data.id);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }

    /*   const toPost = { userId: user.id, dates: selectedDates };
    const reservation = await axios.post(`/booking`, toPost);
    if (reservation.data.length) {
      try {
        
        const mpResponse = await axios.post("/checkout", { price });
        console.log(mpResponse.data);
        if (mpResponse.data.id) {
          dispatch(set_payment_id(mpResponse.data.id))
          createCheckoutButton(mpResponse.data.id)          
        }
      } catch (err) {
        console.log(err);
      }
    } */
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(position);
    map.fitBounds(bounds);
  };

  const createCheckoutButton = (preference) => {
    var script = document.createElement("script");
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.getElementById("checkout-btn").innerHTML = "";
    document.querySelector("#checkout-btn").appendChild(script);
  };

  return (
    <div className={styles.ClubDetail}>
      <NavBar />
      {club.name && (
        <div className={styles.Club}>
          <img src={club.image} alt={club.name} />
          <h1>{club.name}</h1>
          <h4>{club.description}</h4>
          <h3>{location}</h3>

          {club.latitude && (
            <GoogleMap
              //onLoad={handleOnLoad}
              center={position}
              zoom={16}
              mapContainerStyle={{ width: "50vw", height: "60vh" }}
            >
              <Marker
                key={club.name}
                position={position}
                icon={{
                  url: "https://i.postimg.cc/wjKd121N/mark-Canchera.png",
                }}
              ></Marker>
            </GoogleMap>
          )}

          <p>
            horario: de {club.openHour} a {club.closeHour}
          </p>
          <h2>Calendario</h2>
          <p>Seleccione clickeando las horas que desea reservar</p>

          <div className="calendarControls">
            <div className="button" onClick={handlePrevDay}>
              ⏪
            </div>
            <p>
              {isToday(selectedDay) ? "hoy" : selectedDay.toLocaleDateString()}
            </p>
            <div className="button" onClick={handleNextDay}>
              ⏩
            </div>
          </div>
          {club &&
            club.Fields &&
            club.Fields.map((field, i) => (
              <FieldCalendar
                key={i}
                day={selectedDay}
                open={club.openHour}
                close={club.closeHour}
                players={field.players}
                ilumination={field.ilumination}
                price={field.price}
                fieldId={field.id}
                bookings={field.Bookings}
                surface={field.surface}
                handleClick={handleHourClick}
                user="user"
              />
            ))}

          <div className="reservationDetails">
            <p>detalles de su reserva:</p>
            <p>{reservationDetail.hours} horas reservadas</p>
            <p>total: $ {reservationDetail.price}</p>
            <div id={"checkout-btn"}>
              <button onClick={() => handleReservation()}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Clubdetail;
