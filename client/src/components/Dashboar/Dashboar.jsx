import React from 'react';
import { useSelector } from 'react-redux';


function Dashboar() {

    const user = useSelector(state => state.user)
    console.log(user.rol)
    return ( 
        <div>
            <h1>Dashboar</h1> 
            <p>renderizando rol: </p>
 

            
        </div>
    );
}

export default Dashboar;