import React, { useEffect, useState } from "react";
import style from "./ListClubs.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { get_all_clubes } from "../../redux/action";
import CardClub from "../CardClub/CardClub";

import OrderName from "../Order/OrderName";
import OrderCiudad from "../Order/OrderCiudad";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const ListClubs = () => {
  let clubes = useSelector((state) => state.clubes);
  console.log("clubes: ", clubes);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapPos, setMapPos] = useState({ lat: -32.9632, lng: -61.409 });
  const [ciudad, setCiudad] = useState("Goya");
  const [zoom, setZoom] = useState(4);

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

  var clubXciudad = [];
  clubXciudad = clubes.filter((club) => club.ciudad === ciudad);

  const positions =
    clubes &&
    clubes.map((club) => ({ lat: club.latitude, lng: club.longitude }));

  const handleSelect = (e) => {
    setCiudad(e.target.value);
    clubXciudad = clubes.filter((club) => club.ciudad === e.target.value);

    if (clubXciudad.length) {
      let lat = clubXciudad[0].latitude;
      let lng = clubXciudad[0].longitude;
      let newPos = { lat: lat, lng: lng };
      setMapPos(newPos);
      setZoom(14);
    } else {
      setMapPos({ lat: -32.9632, lng: -61.409 });
      setZoom(4);
    }
  };

  return (
    <div className={style.contenedorGral}>
      <div className={style.orders}>
        <OrderName />
        <OrderCiudad />
      </div>

      <div className={style.contenedorlistClubMap}>
        <div className={style.contenedor}>
          {clubes.map((c, i) => (
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
          ))}
        </div>
        <GoogleMap
          //onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          center={mapPos}
          zoom={zoom}
          mapContainerStyle={{ width: "70vw", height: "100vh" }}
        >
          {clubes.map((club, index) => (
            <Marker
              key={index}
              position={positions[index]}
              icon={{ url: "https://i.postimg.cc/wjKd121N/mark-Canchera.png" }}
              onClick={() => handleActiveMarker(club.name)}
            >
              {activeMarker === club.name ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    '{club.name}'
                    <br />
                    {club.street +
                      " " +
                      club.num +
                      " " +
                      club.ciudad +
                      " " +
                      club.province}
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default ListClubs;
