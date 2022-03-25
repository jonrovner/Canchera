import axios from "axios";
import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import { useParams } from "react-router";
//import { resetPass } from "../../redux/action";


const ResetPassword = () => {
    //const dispatch = useDispatch();
   const { token } = useParams();
  
    const [data, setData] = useState({
      password: "",
      //confirmPassword: "",
    }); 
  
     const handleOnChange = (e) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }; 
  
    const  onSubmit = async (e) => {
      e.preventDefault();
      
     /*  const userPassword = {
          password : e.target.password.value
      }; */
       console.log(data);
      await axios.put(`/resetpassword/${token}`, data/* ,{where:{resetPassword:token}} */    
      ).then(data => console.log(data))
      .catch(error => console.log(error)) 
          
    };

    return (
      <div>
        <form onSubmit={onSubmit}>
          <h1> Restablecer Contraseña</h1>
          <span>
            Ingresa tu direccion de email en el campo de abajo y te enviaremos un
            link para restablecer tu password
          </span>
          <span>Direccion de Email</span>
          <input
            type="text"
            name="password"
            placeholder="Email"
            onChange={handleOnChange}
          />
     <input
            type="text"
            name="confirmPassword"
            placeholder="Confirmar Email"
            onChange={handleOnChange}
          />
          <input type="submit" value="GUARDAR PASSWORD" />
        </form>
      </div>
    );
  };
  export default ResetPassword;
  