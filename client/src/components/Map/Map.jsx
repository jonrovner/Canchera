import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Map.module.css";
import { get_all_clubes } from "../../redux/action/index";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";


function Map() {

  const dispatch = useDispatch();
  const [ciudad, setCiudad] = useState("");
  const [mapPos, setMapPos] = useState({ lat: -32.9632, lng: -61.409 });
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    dispatch(get_all_clubes());
  }, [dispatch]);

  const clubes = useSelector((state) => state.clubes);

  /* let ciudades = [];
  clubes.forEach((club) => {
    let algo = cities.find((f) => f.city === club.ciudad);
    ciudades.push(algo);
    ciudades.sort((a, b) => a.city.localeCompare(b.city));
  }); */

  let ciudades = clubes.length && [...new Set(clubes
    .map( c => c.ciudad))]
    .sort((a, b) => a.localeCompare(b))  
  
  console.log("ciudades", ciudades);

  const positions =
    clubes &&
    clubes.map((club) => ({ lat: club.latitude, lng: club.longitude }));

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
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

  const defaultMapOptions = {
    fullscreenControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  return (
    <div className={styles.Map}>
      <div className={styles.clubs}>
        <h2>
          Donde jugar con <span>Canchera</span>
        </h2>
        <div>
          <label htmlFor="ciudades">Clubes en</label>
          <select name="ciudades" onChange={handleSelect} value={ciudad}>
         
            <option>Todos</option>
            {ciudades.length && ciudades              
              .map((city, i) => (
                <option key={i}>{city}</option>
              ))}
          </select>
        </div>
        <ul>
          {clubXciudad.length ? (
            clubXciudad.map((club, index) => {
              return (
                <Link
                  key={index}
                  to={`/club/${club.name.replaceAll(" ", "-")}`}
                >
                  <li key={index}>
                    {club.name}, ⭐{club.score}
                  </li>
                </Link>
              );
            })
          ) : (
            <p>Elegi una ciudad para ver sus clubes Canchera.</p>
          )}
        </ul>
      </div>
      <div>
        <GoogleMap
          
          onClick={() => setActiveMarker(null)}
          center={mapPos}
          zoom={zoom}
          options={defaultMapOptions}
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
                    <p style={{ color: "black" }}>
                      {club.name}, {club.score} ⭐<br />
                      <Link to={`/club/${club.name.replaceAll(" ", "-")}`}>
                        Reservar Aqui
                      </Link>
                    </p>
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
