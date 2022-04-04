import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("collection_status");
  const id = searchParams.get("preference_id");
  const [booking] = useState(
    JSON.parse(window.localStorage.getItem("booking_details"))
  );
  const [msg, setMsg] = useState("Confirmando su reserva.");

  console.log("booking: ", booking);

  useEffect(() => {
    if (booking && booking.payment_id === id && status === "approved") {
      axios
        .post("/booking", booking.toPost)
        .then((response) => {
          if (response.data.length) {
            setMsg("Su reserva ha sido confirmada.");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          }
          console.log("data from server: ", response.data);
        })
        .catch((err) => console.log("error in booking: ", err));
    }
  }, []);

  // const state = useSelector((state) => state)
  console.log("status: ", status);
  console.log("id in query: ", id);

  return (
    <div className={styles.Checkout}>
      <h1>Canchera</h1>
      <p>{msg}</p>
      <Loader />
    </div>
  );
};

export default Checkout;
