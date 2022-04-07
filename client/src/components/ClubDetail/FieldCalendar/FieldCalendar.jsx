import React, { useState } from "react";

import { setHours, eachHourOfInterval, getHours, isBefore } from "date-fns";
import styles from "./fieldCalendar.module.css";

const FieldCalendar = ({
  day,
  close,
  open,
  players,
  bookings,
  price,
  handleClick,
  handleInfo,
  fieldId,
  surface,
  user,
}) => {
  const [now] = useState(new Date());

  const hours = eachHourOfInterval({
    start: setHours(day, open),
    end: setHours(day, close),
  });
  const bookingDates = bookings.map((b) => new Date(b.time));
  // const users = user==='owner' && bookings.map( b => ({name: b.User.name, email: b.User.email}))
  const bookingStrings = bookingDates.map((b) => b.toString());
  const hourStrings = hours.map((h) => h.toString());

  return (
    <div>
      <div className={styles.hoursCalendar}>
        <div className={styles.fieldInfo}>
          <h5>{players} jugadores</h5>
          <p>$ {price}</p>
          <p className={styles.surface}>{surface}</p>
        </div>

        {hourStrings &&
          hourStrings.map((date, i) => (
            <div
              className={
                bookingStrings.indexOf(date) !== -1
                  ? styles.hourReserved
                  : isBefore(hours[i], now)
                  ? styles.hourPast
                  : styles.hour
              }
              key={i}
              onClick={(e) => {
                if (isBefore(hours[i], now)) {
                  return;
                } else {
                  if (user === "owner") {
                    if (bookingStrings.indexOf(date) !== -1) {
                      handleInfo(
                        e,
                        fieldId,
                        bookings[bookingStrings.indexOf(date)]
                      );
                    } else {
                      handleClick(e, date, fieldId, price);
                    }
                  } else {
                    handleClick(e, date, fieldId, price);
                  }
                }
              }}
            >
              {getHours(hours[i])}hs
            </div>
          ))}
      </div>
    </div>
  );
};

export default FieldCalendar;
