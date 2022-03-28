import React from 'react';
import { useSelector } from 'react-redux';
import './style/owner.css';

function Owner({id, name, email, rol}) {

    const user = useSelector(state => state.user)
    const clubes = useSelector(state => state.clubDetail)
    
    let boo = user.Bookings;

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
                <div>
                        <h1>Reservas owner</h1>
                    {
                        boo.length && boo.map((b) =>(   
                            <table id="myTable">
                                <tr className="header">
                                    <th >Club Name</th>
                                    <th >Location</th>
                                    <th >Time</th>
                                    <th >Price</th>
                                    <th >Surface</th>
                                </tr>
                                <tr>
                                    <td>{b.Field.ClubName}</td>
                                    <td>{b.Field.Club.location}</td>
                                    <td>{b.time}</td>
                                    <td>{b.Field.price}</td>
                                    <td>{b.Field.surface}</td>
                                </tr>
                                </table>
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