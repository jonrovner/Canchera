import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";



function Dashboar() {
    
    var loggedInUser ;
    useEffect(() => {
        loggedInUser = localStorage.getItem("user"); 
      });

    // var loggedInUser = localStorage.getItem("user");

    // console.log(loggedInUser)

    return (
        <div>
            <h1>Dashboar</h1>
            <p>renderizando rol:{loggedInUser} </p>


            
        </div>
    );
}

export default Dashboar;