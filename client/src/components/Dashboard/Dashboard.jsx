import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from "./User";
import Owner from "./Owner";
import Admin from "./Admin";

import Navbar from '../NavBar/NavBar';


function Dashboard() {

    const user = useSelector(state => state.user)

    let navigate = useNavigate();

    function onSubmit(e){
        navigate('/login')
    }
   
    
    return ( 
        <div>
            <Navbar/>
            <h1>Dashboard</h1> 
            {
                user.rol === 'user' ? <User/> 
                : user.rol === 'owner' ? <Owner/> 
                : user.rol === 'admin' ? <Admin/> 
                :
                <div>
                    <p>no existe ningun usuario</p> 
                    <button onClick={onSubmit}>Login</button>
                </div>


                
            }
 

            
        </div>
    );
}

export default Dashboard;