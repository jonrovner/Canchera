import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Map.module.css";
import { get_all_clubes } from "../../redux/action/index";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Map() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_clubes());
  }, [dispatch]);

  const clubes = useSelector((state) => state.clubes);
  console.log(clubes);

  const positions = clubes && clubes.map((club) => ({ lat: club.latitude, lng: club.longitude }));
  console.log(positions)

  const ciudades = clubes && clubes.map((club) => ([club.location]));
  console.log(ciudades)

  // const unicos = [];
  // for(var i = 0; i < ciudades.length; i++) { 
  // const elemento = ciudades[i]; 
  // if (!unicos.includes(ciudades[i])) {
  //   unicos.push(elemento);
  // }}
  // console.log(unicos);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    clubes.forEach(({ position }) => bounds.extend(positions));
    map.fitBounds(bounds);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Clubes</h1>
        <ul>
          {!clubes
            ? "Cargando..."
            : clubes.map((club, index) => {
                return (
                  <li key={index}>
                    {" "}
                    {club.name} {club.location}{" "}
                  </li>
                );
              })}
        </ul>
      </div>
      <div>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          center={{ lat: -29.15477, lng: -59.264938 }}
          zoom={14}
          mapContainerStyle={{ width: "70vw", height: "60vh" }}
          options={{ mapId: "f8e61b002a1322a0" }}
        >
          {clubes.map((club, index) => (
            <Marker
              key={club.id}
              position={positions[index]}
              icon={{ url: "https://i.postimg.cc/t43Ldy9h/canchera-PNG.png" }}
              onClick={() => handleActiveMarker(club.id)}
            >
              {activeMarker === club.id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{club.name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
export default Map;