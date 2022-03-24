import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { get_users_email } from '../../redux/action';


function Dashboar() {
    // const dispatch = useDispatch();
    
    // let fn = async (usuario) => {
    //     await dispatch(get_users_email(usuario.email));
    // };
    // var loggedInUser ;
    // useEffect(() => {
    //     loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         const foundUser = JSON.parse(loggedInUser);
    //         fn(foundUser);
    //       }        
    //   });
    //   console.log(loggedInUser + " segundo ");

    var loggedInUser = localStorage.getItem("user");

    console.log(loggedInUser)

    return (
        <div>
            <h1>Dashboar</h1>
            <p>renderizando rol:{loggedInUser} </p>


            
        </div>
    );
}

export default Dashboar;