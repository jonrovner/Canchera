import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import User from "./User";
import Owner from "./Owner";
import Admin from "./Admin";


import Navbar from '../NavBar/NavBar';
import { clean_state, get_users_email } from '../../redux/action';



function Dashboard() {

    const dispatch = useDispatch();

    let user = useSelector(state => state.user)
    let navigate = useNavigate();

    // useEffect(() =>{
    //     dispatch(get_users_email())
    // }, [dispatch])

    const user = useSelector(state => state.user)
    let navigate = useNavigate();


  
    
    // function onSubmit(e){
    //     navigate('/login')
    // }
   
    
    return ( 
        <div>
            <Navbar/>

            <h1>Dashboard</h1> 
            {

                user.rol === 'user' ?  
                <User
                    id = {user.id}                        
                    name = {user.name}
                    email = {user.email}
                    rol = {user.rol}
                />
                     
                : user.rol === 'owner' ? 
                <Owner
                    id = {user.id}                        
                    name = {user.name}
                    email = {user.email}
                    rol = {user.rol}
                /> 
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
    );
}

export default Dashboard;