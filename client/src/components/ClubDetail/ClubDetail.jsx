import React, { useState, useEffect } from "react";
import FieldCalendar from "../FieldCalendar/FieldCalendar.jsx";
import { setHours, setMinutes, setSeconds, addDays } from "date-fns";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { get_club_detail } from "../../redux/action/index.js";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./clubDetail.css";

import axios from "axios";

const Clubdetail = () => {
  //const navigate = useNavigate()
  const params = useParams();
  const dispatch = useDispatch();

  console.log(params.clubName.replaceAll("-", " "));

  //carga los detalles del club en el state
  useEffect(() => {
    dispatch(get_club_detail(params.clubName.replaceAll("-", " ")));
  }, [dispatch, params.clubName]);

  const club = useSelector((state) => state.clubDetail);
  const user = useSelector((state) => state.user);
  const position = club.latitude && { lat: club.latitude, lng: club.longitude };
  const [price, setPrice] = useState(0);
  
  // para armar el calendario, creo un array de 14 fechas a partir de hoy
  const now = new Date();
  const today = setSeconds(setMinutes(setHours(now, 8), 0), 0);
  const [selectedDay] = useState(today);
  const days = [today];
  for (let i = 1; i < 15; i++) {
    days[i] = addDays(today, i);
  }
  
  //para armar la reserva
  const [reservationDetail, setReservationDetail] = useState({})
  const [selectedDates, setSelectedDates] = useState([]);
  useEffect(()=>{
    setReservationDetail({'hours':selectedDates.length, 'price': price})
  },[selectedDates, price]) 

  

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
    // console.log('you selected dates', selectedDates)
    const toPost = { userId: user.id, dates: selectedDates };
    const reservation = await axios.post(`/booking`, toPost);

    //console.log('reservation : ', reservation.data)

    if (reservation.data.length) {
      try {
        const mpResponse = await axios.post("/checkout", { price });
        console.log(mpResponse.data);
        if (mpResponse.data.id) {
          createCheckoutButton(mpResponse.data.id)
          //return window.open(mpResponse.data.sandbox_init_point);
        }
      } catch (err) {
        console.log(err);
      }
    }

    // navigate('/clubs')
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(position);
    map.fitBounds(bounds);
  };
  //console.log('user : ', user.id)
  //console.log('selected', selectedDates)
  console.log("club detail", club);

  const createCheckoutButton = (preference) => {
        var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = preference;
        document.getElementById("checkout-btn").innerHTML = "";
        document.querySelector("#checkout-btn").appendChild(script);
    }
   

  return (
    <div className="clubDetails">
      {club && (
        <div className="clubDetail">
          <img src={club.image} alt={club.name} />
          <h1>{club.name}</h1>
          <h4>{club.description}</h4>
          <h3>{club.location}</h3>

          {club.latitude && (
            <GoogleMap
              onLoad={handleOnLoad}
              center={position}
              zoom={5}
              mapContainerStyle={{ width: "50vw", height: "40vh" }}
              options={{ mapId: "f8e61b002a1322a0" }}
            >
              <Marker
                key={club.name}
                position={position}
                icon={{ url: "https://i.postimg.cc/t43Ldy9h/canchera-PNG.png" }}
              ></Marker>
            </GoogleMap>
          )}

          <p>
            horario: de {club.openHour} a {club.closeHour}
          </p>
          <h2>Calendario</h2>
          {club &&
            club.Fields &&
            club.Fields.map((field) => (
              <FieldCalendar
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
              />
            ))}
           <div className="reservationDetails">
             <p>detalles de su reserva:</p>
             <p>{reservationDetail.hours} horas reservadas</p>
             <p>total: $ {reservationDetail.price}</p>
             </div> 
          <button onClick={() => handleReservation()}>Confirmar</button>
          <div id={"checkout-btn"}></div>
        </div>
      )}
    </div>
  );
};

export default Clubdetail;
