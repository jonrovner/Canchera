import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user, get_all_user, update_user } from "../../redux/action";
import { TiDelete } from "react-icons/ti";
import styles from "./Dashboard.module.css";
import Modal from "./Modal/Modal";

function Admin({ user }) {
  let dispatch = useDispatch();
  let [data, setData] = useState({
    rol: "",
  });
  const [openModal, setOpenModal] = useState({
    modal: false,
    name: "",
    id: "",
  });

  useEffect(() => {
    dispatch(get_all_user());
  }, [dispatch]);

  let allUsers = useSelector((state) => state.allUsers);

  const updateUser = async (id) => {
    await dispatch(update_user(id, data));
    window.location.reload();
  };

  const handlerInputChange = (e) => {
    var value = e.target.value;
    console.log(e.target.value);
    setData({ rol: value });
  };

  return (
    <div className={styles.Admin}>
      <h1>Bienvenido {user.name}</h1>
      <div className={styles.users}>
        <ul>
          {allUsers &&
            allUsers.map((c) => (
              <li key={c.id}>
                Nombre: {c.name} - Rol: {c.rol}
                <button onClick={() => updateUser(c.id)}>Cambiar rol</button>
                <select
                  name="newRol"
                  defaultValue={c.rol}
                  onChange={handlerInputChange}
                >
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
                <TiDelete
                  className={styles.delete}
                  onClick={() =>
                    setOpenModal({ modal: true, name: c.name, id: c.id })
                  }
                />
              </li>
            ))}{" "}
        </ul>
        {openModal.modal && (
          <Modal
            id={openModal.id}
            name={openModal.name}
            closeModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;
