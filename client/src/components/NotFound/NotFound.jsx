import React from "react";
import { useNavigate } from "react-router";
import "./notfound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/");
  };
  return (
    <div className="purpleBk">
      <div className="stars">
        <div className="custom-navbar">
          <div className="brand-logo">
            <img
              src="data:image/jpeg;base64,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"
              width="80px"
            />
          </div>
        </div>
        <div className="central-body">
          <img
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
        <div className="objects">
          <img
            className="object_rocket"
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
          <div className="earth-moon">
            <img
              className="object_earth"
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
            />
            <img
              className="object_moon"
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
            />
          </div>
          <div className="box_astronaut">
            <img
              className="object_astronaut"
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
