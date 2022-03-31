import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { delete_user } from "../../../redux/action";
import style from "./Modal.module.scss";

const Modal = ({ id, name, closeModal }) => {
  let dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [friends, setFriends] = useState([]); //['nico@gmail.com', 'eze@gmail.com' ]

  const handlerConfirm = async () => {
    //await dispatch(delete_user(id));
    //dispatch(postInvitacion(friends))
    alert(`datos de ${name} ${id} ${friends} enviados.`);
    closeModal(false);
  };

  const handlerFriends = (e) => {
    setFriends([...friends, input]);
    document.getElementById("friends").value = "";
  };

  const handlerInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <div className={style.body}>
          <span>{name} envia un recordatorio a los jugadores de tu equipo</span>

          <input
            type="text"
            id="friends"
            onChange={(e) => {
              handlerInputChange(e);
            }}
            placeholder="amigoinvitado@gmail.com"
          />
          <button
            onClick={(e) => {
              handlerFriends(e);
            }}
          >
            Agregar amigo
          </button>
          <ul>
            {friends?.map((f) => (
              <li>{f}</li>
            ))}
          </ul>

          <div className={style.botones}>
            <button onClick={handlerConfirm}>Enviar Invitacion</button>
            <button onClick={() => closeModal(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
