import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import {  useDispatch } from "react-redux";
import { get_users_email } from "../../../redux/action";
import style from "./Modal.module.scss";

const Modal = ({ closeModal }) => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    let user = JSON.parse(window.localStorage.getItem('user'))
    if (user){ dispatch(get_users_email(user.email))}
  })

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <button onClick={() => {
             
              navigate('/')
          }}> X </button>
        <div className={style.title}>
          <h1>Login Successfully</h1>
        </div>
        <div className={style.body}>
          <span>Where do you want to enter?</span>
        </div>
        <div className={style.footer}>
          <span>need help? 'help!!'</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
