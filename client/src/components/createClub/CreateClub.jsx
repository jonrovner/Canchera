import React, { useState, useEffect } from "react";
import FieldForm from "./FieldForm";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import axios from "axios";
import { validate } from "./validation";
import { useNavigate } from "react-router";
import { cities, provinces } from "./ar.js";
import styles from "./createClub.module.css";
import Navbar from "../NavBar/NavBarSinSearch";
import Footer from "../Footer/FooterNoVideo";

const CreateClub = () => {
  const user = useSelector((state) => state.user);
  console.log("user: ", user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.rol !== "owner") {
      navigate("/");
    }

    !user.authorized && navigate("/");
  }, [user, navigate]);

  const [showValid, setShowValid] = useState(false);
  const [valid, setValid] = useState({});

  const [input, setInput] = useState({
    fields: [],
    openHour: "6",
    closeHour: "18",
  });
  const [file, setFile] = useState(null);
  const [filterCities, setFilterCities] = useState([]);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    if (input.ciudad && input.ciudad.length > 0) {
      setShowCities(true);
    }
    if (!input.ciudad || input.ciudad.length < 1) {
      setShowCities(false);
    }
  }, [input.ciudad]);

  useEffect(() => {
    const findMatch = (word, cities) => {
      const regex = new RegExp(word, "gi");

      setFilterCities(
        cities.filter((place) => {
          return place.city.match(regex);
        })
      );
    };
    if (input.ciudad && input.ciudad.length) {
      findMatch(input.ciudad, cities);
    }
  }, [input.ciudad]);

  const [position, setPosition] = useState({});
  const defaultPos = { lat: -39.9632, lng: -64.409 };
  const [zoom, setZoom] = useState(4);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valid.valid || validMap !== "") {
      setShowValid(true);
    } else {
      const formData = new FormData();

      const toPost = {
        ...input,
        score: 0,
        userId: user.id,
      };

      formData.append("data", JSON.stringify(toPost));
      formData.append("image", file);
      console.log(toPost);
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

  useEffect(() => {
    setValid(validate(input));
  }, [input]);

  const fieldInput = (field) => {
    setInput({ ...input, fields: [...input.fields, field] });
  };

  const [validMap, setValidMap] = useState("busque su dirección en el mapa");

  const findMap = (e) => {
    e.preventDefault();
    if (!input.ciudad || !input.street || !input.num || !input.province) {
      return;
    }
    let queryString;
    if (Number(input.street) == input.street) {
      queryString = `calle ${input.street}+${input.num}+${input.ciudad}+${input.province}+Argentina`;
    } else {
      queryString = `${input.street}+${input.num}+${input.ciudad}+${input.province}+Argentina`;
    }

    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${queryString}&format=json&polygon_geojson=1&addressdetails=1`
      )
      .then((res) => {
        //console.log('nominatim response', res.data)
        if (!res.data.length) {
          return setValidMap("ingrese una dirección válida");
        }
        setValidMap("");
        setInput({
          ...input,
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
        });

        setZoom(13);
        setPosition({
          lat: Number(res.data[0].lat),
          lng: Number(res.data[0].lon),
        });
      })
      .catch((err) => {
        return setValidMap("ingrese una dirección válida");
      });
  };

  const handleFile = (e) => {
    setFileName(`Cargaste ${e.target.files[0].name}`);
    setFile(e.target.files[0]);
  };

  const defaultMapOptions = {
    fullscreenControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
  };

  return (
    <div className={styles.CreateClub}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Datos del establecimiento</h1>
          {valid.all && showValid && (
            <p className={styles.error}>{valid.all}</p>
          )}

          <form
            action="/club"
            encType="multipart/form-data"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className={styles.top}>
              <div className={styles.clubName}>
                <label htmlFor="name">Nombre</label>
                <input
                  onChange={handleInput}
                  type="text"
                  name="name"
                  placeholder="La Cañada ..."
                />
                {valid.name && <p className={styles.error}>{valid.name}</p>}

                <div className={styles.imageInput}>
                  <label className={styles.testIMG} htmlFor="image">
                    Subir imagen
                  </label>
                  <small>{fileName}</small>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleFile}
                  ></input>
                </div>
              </div>

              <div className={styles.description}>
                <label htmlFor="description">Description</label>
                <div>
                  <textarea
                    onChange={handleInput}
                    name="description"
                    cols="28"
                    rows="3"
                    maxLength="1400"
                  ></textarea>
                  {valid.description && (
                    <p className={styles.error}>{valid.description}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.center}>
              <div className={styles.address}>
                {validMap !== "" && <p className={styles.error}>{validMap}</p>}
                <label htmlFor="ciudad">Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  onChange={handleInput}
                  list="cityname"
                />
                <datalist id="cityname">
                  {filterCities.length &&
                    showCities &&
                    filterCities
                      .slice(0, 10)
                      .map((city) => <option value={city.city} />)}
                </datalist>

                <label htmlFor="street">Calle</label>
                <input type="text" name="street" onChange={handleInput} />

                <label htmlFor="num">Número</label>
                <input type="text" name="num" onChange={handleInput} />

                <label htmlFor="province">Provincia</label>
                <input
                  type="text"
                  name="province"
                  onChange={handleInput}
                  list="provinceList"
                />
                <datalist id="provinceList">
                  {provinces && provinces.map((p) => <option value={p} />)}
                </datalist>

                <button className={styles.findMap} onClick={(e) => findMap(e)}>
                  Buscar en Mapa
                </button>

                <div className={styles.openHours}>
                  <div>
                    <label htmlFor="openHour">horario apertura</label>
                    <select
                      onChange={(e) => handleInput(e)}
                      type="text"
                      name="openHour"
                    >
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
                  </div>
                  <div>
                    <label htmlFor="closeHour">horario cierre</label>
                    <select
                      onChange={(e) => handleInput(e)}
                      type="text"
                      name="closeHour"
                    >
                      <option value="18">6pm</option>
                      <option value="19">7pm</option>
                      <option value="20">8pm</option>
                      <option value="21">9pm</option>
                      <option value="22">10pm</option>
                      <option value="23">11pm</option>
                      <option value="0">12am</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.map}>
                {defaultPos.lat && (
                  <GoogleMap
                    //onLoad={handleOnLoad}
                    center={position.lat ? position : defaultPos}
                    zoom={zoom}
                    options={defaultMapOptions}
                    mapContainerStyle={{ width: "300px", height: "400px" }}
                  >
                    <Marker
                      position={position}
                      icon={{
                        url: "https://i.postimg.cc/wjKd121N/mark-Canchera.png",
                      }}
                    ></Marker>
                  </GoogleMap>
                )}
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.fieldInput}>
                <h2>Canchas del establecimiento</h2>
                {valid.fields && showValid && (
                  <p className={styles.error}>{valid.fields}</p>
                )}
                <FieldForm handleInput={fieldInput} />
              </div>

              <div className={styles.fields}>
                {input.fields &&
                  input.fields.map((field, i) => (
                    <div className={styles.field} key={i}>
                      <h3>cancha {i + 1}</h3>
                      <p>tamaño: {field.players}</p>
                      <p>superficie: {field.surface}</p>
                      <p>precio: {field.price}</p>
                    </div>
                  ))}
              </div>
            </div>
            <button className={styles.Submit} type="submit" disabled={false}>
              Guardar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateClub;
