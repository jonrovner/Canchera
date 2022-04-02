import React, { useMemo, useState } from "react";
import styles from "./OwnerSignUp.module.css";
import axios from "axios";
import Modal from "./Modal/Modal";
import ModalError from "./Modal/ModalError";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Validate } from "../../utils/Validaciones/validaciones";
import heroIMG from "../../assets/ownerfield.jpg";

const OwnerSignUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (data.name && data.email && data.password && data.confirmPassword) {
      let existe = await axios.post("/signup/owner", data);

      if (!existe.data.error) {
        setOpenModal(true);
        let formulario = document.getElementById("formul");
        formulario.reset();
      } else {
        setOpenModalError(true);
      }
    } else {
      console.log("no enviado");
      setOpenModalError(true);
    }
  };

  const disabeledSubmit = useMemo(() => {
    if (error.name || error.email || error.password || error.confirmPassword) {
      return true;
    }

    return false;
  }, [error]);

  return (
    <div className={styles.SignUp}>
      <div className={styles.content}>
        <div className={styles.hero}>
          <img src={heroIMG} alt="" />

          <div className={styles.form}>
            <form
              id="formul"
              className={styles.signInForm}
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              <h2 className={styles.title}>
                Dueño <span>Canchera</span>
              </h2>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <FaUserAlt />
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nombre"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.name && <p className={styles.error}>{error.name}</p>}
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <MdEmail />
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.email && <p className={styles.error}>{error.email}</p>}
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <RiLockPasswordFill />
                  </div>
                  <input
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.password && (
                    <p className={styles.error}>{error.password}</p>
                  )}
                </div>
              </div>
              <div className={styles.inputField}>
                <div className={styles.input}>
                  <div className={styles.fasFaUser}>
                    <RiLockPasswordFill />
                  </div>
                  <input
                    autoComplete="off"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirmar contraseña"
                    onChange={(e) => handlerInputChange(e)}
                  />
                </div>
                <div className={styles.containerError}>
                  {error.confirmPassword && (
                    <p className={styles.error}>{error.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  className={styles.boton}
                  disabled={disabeledSubmit}
                  value="Registrarse"
                />
                {openModal && <Modal closeModal={setOpenModal} />}
                {openModalError && (
                  <ModalError closeModal={setOpenModalError} />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerSignUp;
