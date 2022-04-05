import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user, get_all_user, update_user } from "../../redux/action";
import { TiDelete } from "react-icons/ti";
import styles from "./Dashboard.module.css";
import Modal from "./Modal/Modal";

function Admin({ user }) {
  const [idUser, setIdUser] = useState("");
  let dispatch = useDispatch();
  let [data, setData] = useState({
    rol: "",
    authorized: null,
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
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (id) => {
    setIdUser(id);
    setData({
      rol: "",
      authorized: null,
    });
  };

  return (
    <div className={styles.Admin}>
      <h1>Bienvenido {user.name}</h1>
      <div className={styles.users}>
        <ul>
          {allUsers &&
            allUsers.map((c) => (
              <li key={c.id}>
                <div className={styles.elemento}>
                  <div className={styles.data}>
                    Nombre: {c.name} - Rol: {c.rol}{" "}
                    {c.rol === "owner"
                      ? c.authorized === true
                        ? ` - Estado: Autorizado`
                        : ` - Estado: Bloqueado`
                      : ""}
                  </div>
                  {idUser === c.id && (
                    <div className={styles.hide}>
                      <select
                        name="rol"
                        defaultValue=""
                        onChange={handlerInputChange}
                      >
                        <option disabled value="">
                          Nuevo Rol
                        </option>
                        <option value="user">User</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                      {c.rol === "owner" && (
                        <select
                          name="authorized"
                          defaultValue=""
                          onChange={handlerInputChange}
                        >
                          <option disabled value="">
                            Nuevo Estado
                          </option>
                          <option value="true">Autorizar</option>
                          <option value="false">Bloqueado</option>
                        </select>
                      )}
                      <button onClick={() => updateUser(c.id)}>
                        Actualizar
                      </button>
                      <TiDelete
                        className={styles.delete}
                        onClick={() =>
                          setOpenModal({ modal: true, name: c.name, id: c.id })
                        }
                      />
                    </div>
                  )}
                </div>
                {idUser !== c.id && (
                  <button onClick={() => handleEdit(c.id)}>Editar</button>
                )}
              </li>
            ))}
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
