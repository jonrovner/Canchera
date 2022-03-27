import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Map.module.css";
import { get_all_clubes } from "../../redux/action/index";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

function Map() {
  const dispatch = useDispatch();
  const [ciudad, setCiudad] = useState("Goya");
  const [mapPos, setMapPos] = useState({ lat: -32.9632, lng: -61.409 });
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    dispatch(get_all_clubes());
  }, [dispatch]);

  const clubes = useSelector((state) => state.clubes);

  const positions =
    clubes &&
    clubes.map((club) => ({ lat: club.latitude, lng: club.longitude }));

  const ciudades = clubes && clubes.map((club) => [club.ciudad]);

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

  var clubXciudad = [];
  clubXciudad = clubes.filter((club) => club.ciudad === ciudad);

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
    <div className={styles.Map}>
      <div>
        <small>(FALTA DAR ESTILOS A ESTE COMPONENTE)</small>
        <h2>Clubes de Cancheras</h2>
        <h3>Ciudades</h3>
        <select name="ciudades" onChange={handleSelect}>
          <option value="Goya">Goya</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Tucuman">Tucuman</option>
          <option value="La Rioja">La Rioja</option>
          <option value="Corrientes">Corrientes</option>
        </select>
        <h3>Clubes</h3>
        <ul>
          {clubXciudad &&
            clubXciudad.map((club, index) => {
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
          //onLoad={handleOnLoad}
          onClick={() => setActiveMarker(null)}
          center={mapPos}
          zoom={zoom}
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

//center={{ lat: -32.9632, lng: -61.409 }}
