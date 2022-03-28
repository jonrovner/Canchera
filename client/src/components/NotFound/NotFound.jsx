import React from "react";
import { useNavigate } from "react-router";
import "./notfound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div>
        <div className="custom-navbar">
          <div className="brand-logo"></div>
        </div>
        <div className="central-body">
          <img
            alt=""
            className="image-404"
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
          />
          <span onClick={handleOnClick} className="btn-go-home">
            GO BACK HOME
          </span>
          <span onClick={handleOnClick} className="btn-go-home">
            CONTACT US
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
