import { useState } from "react";
import { useDispatch } from "react-redux";
import { passForgotten } from "../../redux/action";

const ValidateEmail = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
  });

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.email) {
      dispatch(passForgotten(data));
    }
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
          name="email"
          placeholder="Email"
          onChange={handleOnChange}
        />
        <input type="submit" value="VALIDAR EMAIL" />
      </form>
   </div>
  );
};

export default ValidateEmail;





