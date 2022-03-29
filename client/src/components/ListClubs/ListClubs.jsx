import React, { useEffect, useState } from "react";
import style from "./ListClubs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { get_all_clubes } from "../../redux/action";
import CardClub from "../CardClub/CardClub";

import OrderName from "../Order/OrderName";
import OrderCiudad from "../Order/OrderCiudad";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import Navbar from "../NavBar/NavBar";

const ListClubs = () => {
  let clubes = useSelector((state) => state.clubes);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_all_clubes());
  }, [dispatch]);

  const positions =
    clubes &&
    clubes.map((club) => ({ lat: club.latitude, lng: club.longitude }));

  return (
    <>
      <Navbar />
      <div className={style.contenedorGral}>
        <div className={style.orders}>
          <OrderName />
          <OrderCiudad />
        </div>

        <div className={style.contenedorlistClubMap}>
          <div className={style.contenedor}>
            {clubes.length > 0 ? (
              clubes.map((c, i) => (
                <CardClub
                  key={i}
                  name={c.name}
                  img={c.image}
                  location={
                    c.street + " " + c.num + " " + c.ciudad + " " + c.province
                  }
                  openHour={c.openHour}
                  closeHour={c.closeHour}
                  Fields={c.Fields}
                />
              ))
            ) : (
              <p>No se encontraron resultados</p>
            )}
          </div>
          <GoogleMap
            //onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            center={{ lat: -32.9632, lng: -61.409 }}
            zoom={4}
            mapContainerStyle={{ width: "70vw", height: "100vh" }}
          >
            {clubes.map((club, index) => (
              <Marker
                key={index}
                position={positions[index]}
                icon={{
                  url: "https://i.postimg.cc/wjKd121N/mark-Canchera.png",
                }}
                onClick={() => handleActiveMarker(club.name)}
              >
                {activeMarker === club.name ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      '{club.name}'
                      <br />
                      {club.location}
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default ListClubs;
