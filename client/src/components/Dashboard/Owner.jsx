import React, {useState, useEffect} from "react";
import axios from "axios";
import "./style/owner.css";

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
