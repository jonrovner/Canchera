import React from 'react';


function Admin({id, name, email, rol}) {
    return (
        <div>
            <h1>Bienvenido {name}</h1> 
            <div key={id}>
                <h1>Datos</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Rol: {rol}</p>
            </div>         
        </div>
    );    
}

export default Admin;