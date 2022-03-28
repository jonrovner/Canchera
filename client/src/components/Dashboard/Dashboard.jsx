import React from 'react';
import User from "./User";
import Owner from "./Owner";
import Admin from "./Admin";
import { useSelector } from 'react-redux';

import Navbar from '../NavBar/NavBar';


function Dashboard() {
    const user = useSelector(state => state.user)
    
    return ( 
        <div>
            <Navbar/>
            <h1>Dashboard</h1> 
            {
                user.rol === 'user' ?  
                <div>
                    <User
                        id = {user.id}                        
                        name = {user.name}
                        email = {user.email}
                        rol = {user.rol}
                    />                   
                </div> 
                : user.rol === 'owner' ? 
                <div>
                    <Owner
                        id = {user.id}                        
                        name = {user.name}
                        email = {user.email}
                        rol = {user.rol}
                    />
                </div> 
                : user.rol === 'admin' ? 
                <Admin
                    id = {user.id}                        
                    name = {user.name}
                    email = {user.email}
                    rol = {user.rol}
                /> 

                : 
                <div>
                    <p>Cargando... </p>  
                </div>  

                
            }
        </div>
      )}
    </div>
  );
}

export default Dashboard;
