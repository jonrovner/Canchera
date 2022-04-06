import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./Modal.module.scss";
import { cities, provinces } from "../../createClub/ar.js";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { validate } from "../../createClub/validation";

const Modal = ({ club, closeModal }) => {
  const user = useSelector((state) => state.user);
  const [showValid, setShowValid] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [valid, setValid] = useState({});
  const [zoom, setZoom] = useState(4);
  const [position, setPosition] = useState({});
  const [filterCities, setFilterCities] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const defaultPos = { lat: -39.9632, lng: -64.409 };
  const [field, setField] = useState({});
  const [input, setInput] = useState({
    fields: club.Fields.map((f) => f),
    openHour: "6",
    closeHour: "18",
    ciudad: club.ciudad,
    street: club.street,
    num: club.num,
    province: club.province,
  });
  useEffect(() => {
    findMap();
  }, []);

  useEffect(() => {
    setValid(validate(input));
  }, [input]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    findMap();

    fieldInput(field);

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
        .put(`/club/${club.name}`, toPost)
        .then((res) => {
          if (res.data.newClub.name) {
            closeModal(false);
            window.location.reload();
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

  const handleFile = (e) => {
    setFileName(`Cargaste ${e.target.files[0].name}`);
    setFile(e.target.files[0]);
  };

  const findMap = (e) => {
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
        setInput({
          ...input,
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
        });
        if (!res.data[0].lat) {
          return setValid({ ...valid, map: "ingrese una dirección válida" });
        }

        setZoom(13);
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
      });
  };

  const fieldInput = (canchas) => {
    setInput({ ...input, fields: [...input.fields, canchas] });
  };
  const handlerFields = (e, i) => {
    /* setField({
      ...field,
    }); */

    setInput({
      ...input,
      fields: input.fields.map((f, j) => {
        if (j === i) {
          f = {
            ...f,
            [e.target.name]: +e.target.value ? +e.target.value : e.target.value,
          };
        }
        return f;
      }) /* (input.fields[i] = {
        ...input.fields[i],
        [e.target.name]: e.target.value,
      }), */,
    });
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContainer}>
        <div className={style.body}>
          <div className={style.CreateClub}>
            <div className={style.content}>
              <h1>Editar datos del club: {club.name}</h1>

              <form
                action="/club/:clubName"
                encType="multipart/form-data"
                method="put"
                onSubmit={handleSubmit}
              >
                <div className={style.top}>
                  <div className={style.clubName}>
                    <label htmlFor="name">Nombre</label>
                    <input
                      onChange={handleInput}
                      type="text"
                      name="name"
                      disabled
                      defaultValue={club.name}
                      placeholder={club.name}
                    />
                    {valid.name && <p className={style.error}>{valid.name}</p>}

                    <div className={style.imageInput}>
                      <label className={style.testIMG} htmlFor="image">
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

                  <div className={style.description}>
                    <label htmlFor="description">Description</label>
                    <div>
                      <textarea
                        onChange={handleInput}
                        name="description"
                        cols="28"
                        rows="3"
                        defaultValue={club.description}
                        maxLength="1400"
                      ></textarea>
                      {/* <input onChange={handleInput} type="text" name="description" /> */}
                      {valid.description && showValid && (
                        <p className={style.error}>{valid.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className={style.center}>
                  <div className={style.address}>
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      onChange={handleInput}
                      list="cityname"
                      defaultValue={club.ciudad}
                    />
                    <datalist id="cityname">
                      {filterCities.length &&
                        showCities &&
                        filterCities
                          .slice(0, 10)
                          .map((city) => <option value={city.city} />)}
                    </datalist>

                    <label htmlFor="street">Calle</label>
                    <input
                      type="text"
                      defaultValue={club.street}
                      name="street"
                      onChange={handleInput}
                    />

                    <label htmlFor="num">Número</label>
                    <input
                      type="text"
                      defaultValue={club.num}
                      name="num"
                      onChange={handleInput}
                    />

                    <label htmlFor="province">Provincia</label>
                    <input
                      type="text"
                      name="province"
                      defaultValue={club.province}
                      onChange={handleInput}
                      list="provinceList"
                    />
                    <datalist id="provinceList">
                      {provinces && provinces.map((p) => <option value={p} />)}
                    </datalist>

                    {valid.all && showValid && (
                      <p className={style.error}>{valid.all}</p>
                    )}
                    {/* <button
                      className={style.findMap}
                      onClick={(e) => findMap(e)}
                    >
                      Buscar en Mapa
                    </button> */}

                    <div className={style.openHours}>
                      <div>
                        <label htmlFor="openHour">horario apertura</label>
                        <select
                          onChange={(e) => handleInput(e)}
                          type="text"
                          name="openHour"
                          defaultValue={club.openHour}
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
                          defaultValue={club.closeHour}
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

                  <div className={style.map}>
                    {defaultPos.lat && (
                      <GoogleMap
                        //onLoad={handleOnLoad}
                        center={position.lat ? position : defaultPos}
                        zoom={zoom}
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

                <div className={style.bottom}>
                  <div className={style.fieldInput}>
                    <h2>Canchas del establecimiento</h2>
                    {valid.fields && showValid && (
                      <p className={style.error}>{valid.fields}</p>
                    )}
                    {/* <FieldForm handleInput={fieldInput} /> */}
                    {input.fields.map((f, i) => (
                      <div>
                        <h3>Cancha {i + 1} </h3>
                        <div>
                          <label htmlFor="players">Tamaño</label>
                          <select
                            name="players"
                            onChange={(e) => handlerFields(e, i)}
                            defaultValue={f.players}
                          >
                            <option value="" disabled>
                              tamaño
                            </option>
                            <option value="5">5</option>
                            <option value="9">9</option>
                            <option value="11">11</option>
                          </select>
                          {!valid.valid && valid.players && (
                            <p className={style.error}>{valid.players}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="players">Superficie</label>
                          <select
                            name="surface"
                            onChange={(e) => handlerFields(e, i)}
                            defaultValue={f.surface}
                          >
                            <option value="" disabled>
                              superficie
                            </option>
                            <option value="cemento">cemento</option>
                            <option value="sintetico">sintético</option>
                            <option value="cesped">césped</option>
                          </select>
                          {!valid.valid && valid.surface && (
                            <p className={style.error}>{valid.surface}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="price">Precio</label>
                          <input
                            type="number"
                            name="price"
                            defaultValue={f.price}
                            placeholder={f.price}
                            onChange={(e) => handlerFields(e, i)}
                          />
                          {!valid.valid && valid.price && (
                            <p className={style.error}>{valid.price}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    className={style.Submit}
                    type="submit"
                    disabled={false}
                  >
                    Guardar
                  </button>
                  <button
                    className={style.Submit}
                    type="submit"
                    disabled={false}
                    onClick={() => closeModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
