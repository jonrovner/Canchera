import React from 'react';
import { useSelector } from 'react-redux';


function User({id, name, email, rol}) {
 
    const user = useSelector(state => state.user)

    let boo = user.Bookings;
    return (
        <div>
            <h1>Bienvenido {name}</h1> 
            {/* <div key={id}>
                <h1>Datos</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Rol: {rol}</p>
            </div>     */}
            <div>
                        <h1>Reservas</h1>
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
        </div>
    );
}

export default User;