import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const positions =
    clubes &&
    clubes.map((club) => ({ lat: club.latitude, lng: club.longitude }));
  console.log(positions);

  const ciudades = clubes && clubes.map((club) => [club.location]);
  console.log(ciudades);

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
    <div className={styles.Map}>
      <div>
        <small>(FALTA DAR ESTILOS A ESTE COMPONENTE)</small>
        <h2>Clubes de Cancheras</h2>
        <ul>
          {!clubes
            ? "Cargando..."
            : clubes.map((club, index) => {
                return (
                  <Link key={index} to={`/club/${club.name}`}>
                    <li key={index}> {club.name} </li>
                  </Link>
                );
              })}
        </ul>
      </div>
      <div>
        <GoogleMap
          onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          center={{ lat: -32.9632, lng: -61.4090 }}
         zoom={5}
          mapContainerStyle={{ width: "700px", height: "70vh" }}
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
                    {club.location}
                  </div>
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
