import React, {useState, useEffect} from "react";
import axios from "axios";
import {
  setHours,
  setMinutes,
  setSeconds,
  addDays,
  subDays,
 
} from "date-fns";
import "./style/owner.css";
import FieldCalendar from "../ClubDetail/FieldCalendar/FieldCalendar";

function Owner({ id, name, email, rol }) {

  const [owner, setOwner] = useState({})
  const [club, setClub] = useState({})

  useEffect(()=>{
      const getOwner = (email) =>{
        axios.get(`/owner?email=${email}`)
        .then( res => setOwner(res.data))
      }
      getOwner(email)

  },[email])
  
  useEffect(()=>{    
    setClub(owner.Club)
  },[setClub, owner.Club])


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

  console.log('owner: ', owner)
  console.log('club: ', club)

  return (
    <div>
      <h1>Bienvenido {name}</h1>
      <div key={id}>
        <h1>Datos</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Rol: {rol}</p>
      </div>
      <div>
        <a href="/createClub"> create club</a>
      </div>

        {
          club && 
      (<div>
            
            <h3>Datos de su club </h3>
            <p>Nombre: {club.name}</p>
            <p>Descripción: {club.description}</p>
            <p>Dirección: {`${club.street} ${club.num} ${club.ciudad}`}</p>
            <p>Horario: {`de ${club.openHour} a ${club.closeHour} hs`}</p>

          <button>editar</button>
      </div>)
        }

      <div>
        <h1>Reservas owner</h1>
        {club && club.Fields &&
          club.Fields.map((field) => (
            <table id="myTable">
              <tr className="header">
                <th>Nombre</th>
                <th>Cancha</th>
                <th>Precio</th>
                <th>Reservas</th>
                
              </tr>
              <tr>
                <td>{field.ClubName}</td>
                <td>{field.id}</td>
                <td>{field.price}</td>
                <td>
                  <ul>
                  {
                  field.Bookings.length && field.Bookings.map(booking => (
                    <li>{booking.time}</li>
                  ))

                  }
                  </ul>
                  </td>
                
              </tr>
            </table>
          ))}

          {
            club && club.Fields && club.Fields.map( field => (
              <FieldCalendar 
              day={today}
              close={club.closeHour}
              open={club.openHour}
              players={field.players}
              bookings={field.Bookings}
              price={field.price}
              handleClick={()=>{}}
              fieldId={field.id}
              surface={field.surface}
              
              />

            ))
          }
      </div>

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
