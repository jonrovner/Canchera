import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { delete_user, invitacion } from "../../../redux/action";
import { Validate } from "../../../utils/Validaciones/validateEmail";
import style from "./Modal.module.scss";

const Modal = ({ id, name, closeModal }) => {
  let dispatch = useDispatch();
  const [error, setError] = useState({});
  const [input, setInput] = useState("");
  const [friends, setFriends] = useState({
    emails: [],
  }); /*{
          emails: ['nico@gmail.com', 'eze@gmail.com']
        }*/

  const handlerConfirm = async () => {
    if (friends.emails.length > 0) {
      //alert(`${id}, ${name}, ${friends.emails}`);
      dispatch(invitacion(id, friends));
      closeModal(false);
    }
  };

  const handlerFriends = () => {
    if (input.length > 0) {
      setFriends({ emails: [...friends.emails, input] });
      document.getElementById("friends").value = "";
    }
  };

  const handlerInputChange = (e) => {
    setInput(e.target.value);
    setError(Validate({ [e.target.name]: e.target.value }));
  };

  const disabeledSubmit = useMemo(() => {
    if (error.email) {
      return true;
    }

    return false;
  }, [error]);
  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <div className={style.body}>
          <span>{name} envia un recordatorio a los jugadores de tu equipo</span>

          <input
            type="text"
            id="friends"
            name="email"
            onChange={(e) => {
              handlerInputChange(e);
            }}
            placeholder="amigoinvitado@gmail.com"
          />
          {error.email && <p>{error.email}</p>}
          <button
            disabled={disabeledSubmit}
            onClick={(e) => {
              handlerFriends(e);
            }}
          >
            Agregar amigo
          </button>
          <ul>
            {friends.emails?.map((f) => (
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
