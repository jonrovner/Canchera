import React from 'react';
import { useSelector } from 'react-redux';
import User from "./User";
import Owner from "./Owner";
import Admin from "./Admin";



function Dashboar() {

    const user = useSelector(state => state.user)
    
    
    return ( 
        <div>
            <h1>Dashboar</h1> 
            {
                user.rol === 'user' ? <User/> 
                : user.rol === 'owner' ? <Owner/> 
                : user.rol === 'admin' ? <Admin/> 
                : <p>no hay usuario</p> 
                
            }
 

            
        </div>
    );
}

export default Dashboar;