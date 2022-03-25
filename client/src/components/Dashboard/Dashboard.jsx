import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import User from "./User";
import Owner from "./Owner";
import Admin from "./Admin";


import Navbar from '../NavBar/NavBar';
import { clean_state } from '../../redux/action';


function Dashboard() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    let navigate = useNavigate();


    useEffect(() =>{
        dispatch(clean_state())
    }, [dispatch])
    
    
    // function onSubmit(e){
    //     navigate('/login')
    // }
   
    
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
                    <p>Cargando... </p>  
                </div>  

                
            }
 

            
        </div>
    );
}

export default Dashboard;