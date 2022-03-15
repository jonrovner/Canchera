import React, { useState, useMemo } from "react";
import Modal from "./Modal/Modal";
import ModalError from "./Modal/ModalError";
import style from "./OwnerSignUp.module.scss";
import { Validate } from "./validaciones/validaciones.js";

const OwnerSignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [error, setError] = useState({});

  const handlerInputChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
    setError(Validate({ ...data, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.name && data.email && data.password) {
      console.log("enviado");
      setOpenModal(true);
      /* dispatch(); */
    } else {
      console.log("no enviado");
      setOpenModalError(true);
    }
  };

  /* const disabeledSubmit = useMemo(() => {
    if (error.name || error.email || error.password) {
      return true;
    }

    return false;
  }, [error]); */

  return (
    <div className={style.contenedor}>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <h1>Registro</h1>
        <div>
          <input
            autoComplete="off"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={(e) => handlerInputChange(e)}
          />
          {error.name && <p>{error.name}</p>}
        </div>
        <div>
          <input
            autoComplete="off"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={(e) => handlerInputChange(e)}
          />
          {error.email && <p>{error.email}</p>}
        </div>
        <div>
          <input
            autoComplete="off"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handlerInputChange(e)}
          />
          {error.password && <p>{error.password}</p>}
        </div>
        <div>
          <input
            type="submit"
            className={style.boton}
            /* disabled={disabeledSubmit} */
            value="Send"
          />
          {openModal && <Modal closeModal={setOpenModal} />}
          {openModalError && <ModalError closeModal={setOpenModalError} />}
        </div>
      </form>
    </div>
  );
};

export default OwnerSignUp;
