import React, { useState, useEffect } from "react";
import FieldForm from "./FieldForm";
//import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import axios from "axios";
//import "./createClub.css";
import { validate } from "./validation";
import { useNavigate } from "react-router";
//import { cities } from "./ar.js";

const CreateClub = () => {
  const navigate = useNavigate();
  const [showValid, setShowValid] = useState(false);
  const [valid, setValid] = useState({});

  const [input, setInput] = useState({
    fields: [],
    openHour: "6",
    closeHour: "18",
  });
  const [file, setFile] = useState(null);

  //const [filterCities, setFilterCities] = useState([]);

  useEffect(() => {
    setValid(validate(input));
  }, [input]);

  /* useEffect(()=>{
    const findMatch = (word, cities) => {
      const regex = new RegExp(word, "gi");


      setFilterCities(
        cities.filter((place) => {
          return place.city.match(regex) || place.admin_name.match(regex);
        })
      );
    };
    findMatch(input.city, cities);
  }, [input.city]);
 */

  const [position, setPosition] = useState({});

  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valid.valid) {
      setShowValid(true);
    } else {
      const formData = new FormData();

      const toPost = {
        ...input,
        score: "3",
        userId: user.id,
      };

      formData.append("data", JSON.stringify(toPost));
      formData.append("image", file);
      axios
        .post("/club", formData)
        .then((res) => {
          if (res.data.name) {
            navigate("/clubs");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const fieldInput = (field) => {
    setInput({ ...input, fields: [...input.fields, field] });
  };

  const findMap = (e) => {
    console.log(e)
    e.preventDefault();

    if (!input.ciudad || !input.street || !input.num || !input.province) {
      return;
    }
    let queryString
    if (Number(input.street) == input.street ){
      
      queryString = `calle ${input.street}+${input.num}+${input.ciudad}+${input.province}+Argentina`;
     
    } else {

      queryString = `${input.street}+${input.num}+${input.ciudad}+${input.province}+Argentina`;
    }
    
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${queryString}&format=json&polygon_geojson=1&addressdetails=1`
      )
      .then((res) => {
        
        setInput({
          ...input,
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
        });
        if (!res.data[0].lat) {
          return setValid({ ...valid, map: "ingrese una dirección válida" });
        }

        setPosition({
          lat: Number(res.data[0].lat),
          lng: Number(res.data[0].lon),
        });
      })
      .catch((err) => {
        setInput((input) => ({
          ...input,
          latitude: "34.60",
          longitude: "58.38",
        }));

        //return setValid({...valid, map: 'ingrese una dirección válida'})
      });
  };
  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(position);
    map.fitBounds(bounds);
  };

  return (
    <div className="createClub">
      <form
        action="/club"
        encType="multipart/form-data"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="title">
          <h1>Complete los datos de su establecimiento</h1>
          {valid.all && showValid && <p className="validation">{valid.all}</p>}
        </div>
        <div className="clubName">
          <label htmlFor="name">Nombre</label>
          <input onChange={handleInput} type="text" name="name" />
          {valid.name && <p className="validation">{valid.name}</p>}
        </div>
        <br />
        <div className="description">
          <label htmlFor="descritption">Description</label>
          <input onChange={handleInput} type="text" name="description" />
          {valid.description && showValid && (
            <p className="validation">{valid.description}</p>
          )}
        </div>
        <br />
        <div className="address">
          <label htmlFor="ciudad">Ciudad</label>
          <select
            defaultValue={"null"}
            type="text"
            name="ciudad"
            onChange={handleInput}
          >
            <option value="null" disabled>
              Elegir ciudad
            </option>
            <option value="Mercedes">Mercedes</option>
            <option value="Goya">Goya</option>
            <option value="Tucumán">Tucumán</option>
            <option value="Corrientes">Corrientes</option>
            <option value="La Rioja">La Rioja</option>
          </select>

          <label htmlFor="street">Calle</label>
          <input type="text" name="street" onChange={handleInput} />

          <label htmlFor="num">Número</label>
          <input type="text" name="num" onChange={handleInput} />

          <label htmlFor="province">Provincia</label>
          <input type="text" name="province" onChange={handleInput} />
        </div>
        <br />
        <div className="location">
          <button onClick={(e) => findMap(e) }>find map</button>
        </div>
        <br />

        {position.lat && (
          <GoogleMap
            onLoad={handleOnLoad}
            center={position}
            zoom={7}
            mapContainerStyle={{ width: "50vw", height: "40vh" }}
          >
            <Marker
              position={position}
              icon={{ url: "https://i.postimg.cc/t43Ldy9h/canchera-PNG.png" }}
            ></Marker>
          </GoogleMap>
        )}

        <div className="openHours">
          <label htmlFor="openHour">horario apertura</label>
          <select onChange={(e) => handleInput(e)} type="text" name="openHour">
            <option value="5">5am</option>
            <option value="6">6am</option>
            <option value="7">7am</option>
            <option value="8">8am</option>
            <option value="9">9am</option>
            <option value="10">10am</option>
            <option value="11">11m</option>
            <option value="12">12pm</option>
            <option value="13">1pm</option>
            <option value="14">2pm</option>
            <option value="15">3pm</option>
            <option value="16">4pm</option>
            <option value="17">5am</option>
          </select>
          <label htmlFor="closeHour">horario cierre</label>
          <select onChange={(e) => handleInput(e)} type="text" name="closeHour">
            <option value="18">6pm</option>
            <option value="19">7pm</option>
            <option value="20">8pm</option>
            <option value="21">9pm</option>
            <option value="22">10pm</option>
            <option value="23">11pm</option>
            <option value="0">12am</option>
          </select>
        </div>
        <br />
        <div className="imageInput">
          <label htmlFor="image">suba una imagen</label>
          <input
            name="image"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
        </div>
        <br />
        <div className="fields">
          {input.fields &&
            input.fields.map((field, i) => (
              <div className="field" key={i}>
                <h3>cancha {i + 1}</h3>
                <p>tamaño: {field.players}</p>
                <p>precio: {field.price}</p>
              </div>
            ))}
        </div>
        <br />
        <div className="fieldInput">
          <h4>agregue sus canchas</h4>
          {valid.fields && showValid && (
            <p className="validation">{valid.fields}</p>
          )}
          <FieldForm handleInput={fieldInput} />
        </div>
        <br />
        <button type="submit">guardar</button>
      </form>
    </div>
  );
};

export default CreateClub;
