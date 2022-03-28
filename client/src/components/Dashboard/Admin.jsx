import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user, get_all_user, update_user } from "../../redux/action";

function Admin({ user }) {
  let dispatch = useDispatch();
  let [data, setData] = useState({
    rol: "",
  });

  useEffect(() => {
    dispatch(get_all_user());
  }, [dispatch]);

  let allUsers = useSelector((state) => state.allUsers);

  const deleteUser = async (id) => {
    await dispatch(delete_user(id));
    window.location.reload();
  }; 

  const updateUser = async (id) => {
    await dispatch(update_user(id, data));
    window.location.reload();
  };

  const handlerInputChange = (e) => {
    var value = e.target.value;
    setData({ rol: value });
  };

  return (
    <div>
      <h1>Bienvenido {user.name}</h1>
      <div key={user.id}>
        <h1>Datos</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Rol: {user.rol}</p>
        <ul>
          {allUsers &&
            allUsers.map((c) => (
              <li key={c.id}>
                Name: {c.name} - Rol: {c.rol}
                <button onClick={() => deleteUser(c.id)}>delete</button>
                <button onClick={() => updateUser(c.id)}>update rol</button>
                <input
                  onChange={(e) => handlerInputChange(e)}
                  type="text"
                  placeholder="nuevo rol"
                />
              </li>
            ))}{" "}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
