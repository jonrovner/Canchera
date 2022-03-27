import React from "react";
import axios from "axios";

function Owner({ id, name, email, rol }) {
  const owner = axios.get(`/owner?email=${email}`);
  console.log(owner.data);

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

export default Owner;
