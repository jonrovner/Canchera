import React, { useEffect, useState } from "react";
import styles from "./ListClubs.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { get_all_clubes, locationFilter } from "../../redux/action";
import CardClub from "../CardClub/CardClub";
import OrderName from "../Order/OrderName";
import OrderCiudad from "../Order/OrderCiudad";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import ScrollButton from "../ScrollButton/ScrollButton";
import NavBar from "../NavBar/NavBarSinSearch";
import Footer from "../Footer/FooterNoVideo";
import { AiOutlineSearch } from "react-icons/ai";
import { cities } from "../createClub/ar";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import Loader from "../Loader/Loader";

const ListClubs = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_all_clubes());
  }, [dispatch]);

  let serchBarResult = useSelector((state) => state.filterClubs);

  let clubes = useSelector((state) => state.clubes);
  const [filterClubs, setFilterClubs] = useState([]);

  let intialClubes = clubes.map((club) => ({
    ...club,
    pos: { lat: club.latitude, lng: club.longitude },
  }));

  const [activeMarker, setActiveMarker] = useState(null);
  const [mapPos, setMapPos] = useState({ lat: -32.9632, lng: -61.409 });
  const [ciudad, setCiudad] = useState("Goya");
  const [zoom, setZoom] = useState(4);
  const [input, setInput] = useState({
    ciudad: "",
    size: "",
    clubName: "",
  });
  const [showCities, setShowCities] = useState(false);
  const [filterCities, setFilterCities] = useState([]);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

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

  const [mapFilter, setMapFilter] = useState(false);

  const handleMapFilter = () => {
    setMapFilter(!mapFilter);
    dispatch(locationFilter());
  };
  const [mapBounds, setMapBounds] = useState({});

  useEffect(() => {
    if (clubes.length && mapBounds.zb) {
      let filtered = intialClubes.filter((club) =>
        mapBounds.contains(club.pos)
      );

      setFilterClubs(filtered);
    }
  }, [mapBounds]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // aca ya esta listo para ir a /clubs y filtrar segun lo pedido.
    await dispatch(get_all_clubes());
    await dispatch(locationFilter(input));
  };

  const onChange = async (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

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

  const defaultMapOptions = {
    fullscreenControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
  };

  clubes = [];
  return (
    <div className={styles.ListClubs}>
      <div className={styles.nonFooter}>
        <NavBar />
        <div className={styles.Container}>
          <div className={styles.search}>
            {/* <OrderName />
            <OrderCiudad /> */}
            <div className={styles.orderScore}>
              Ordenar por Calificación
              <div>
                <button>
                  <BsArrowUpCircleFill />
                </button>
                <button>
                  <BsArrowDownCircleFill />
                </button>
              </div>
            </div>
            <div className={styles.searchBar}>
              <form action="" onSubmit={handleSubmit}>
                <input
                  onChange={(e) => onChange(e)}
                  className={styles.ciudad}
                  name="ciudad"
                  type="text"
                  placeholder="CIUDAD"
                  value={input.ciudad}
                  list="cityname"
                />
                {
                  <datalist id="cityname">
                    {filterCities.length &&
                      showCities &&
                      filterCities
                        .slice(0, 10)
                        .map((city) => <option value={city.city} />)}
                  </datalist>
                }
                <input
                  onChange={(e) => onChange(e)}
                  className={styles.size}
                  name="size"
                  type="number"
                  placeholder="TAMAÑO"
                  value={input.size}
                />
                <input
                  onChange={(e) => onChange(e)}
                  className={styles.clubName}
                  name="clubName"
                  type="text"
                  placeholder="CLUB"
                  value={input.clubName}
                />
                <button onSubmit={handleSubmit}>
                  <AiOutlineSearch />
                </button>
              </form>
            </div>
          </div>

          <div className={styles.clubesYmap}>
            <div className={styles.clubes}>
              {serchBarResult.length ? (
                serchBarResult.map((c, i) => (
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
              ) : mapFilter ? (
                filterClubs.map((c, i) => (
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
                    score={c.score}
                  />
                ))
              ) : clubes.length ? (
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
                    score={c.score}
                  />
                ))
              ) : (
                <Loader />
              )}
            </div>
            <div className={styles.map}>
              <label className={styles.mapFilter} htmlFor="mapFilter">
                Usar mapa como filtro
                <input
                  name="mapFilter"
                  id="mapFilter"
                  type="checkbox"
                  onClick={handleMapFilter}
                />
              </label>
              <GoogleMap
                onClick={() => setActiveMarker(null)}
                center={mapPos}
                zoom={zoom}
                options={defaultMapOptions}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                }}
                onLoad={(map) => {
                  map.addListener("bounds_changed", () => {
                    let newBounds = map.getBounds();
                    setMapBounds(newBounds);
                  });
                }}
              >
                {serchBarResult.length
                  ? serchBarResult.map((club, index) => (
                      <Marker
                        key={index}
                        position={positions[index]}
                        icon={{
                          url: "https://i.postimg.cc/wjKd121N/mark-Canchera.png",
                        }}
                        onClick={() => handleActiveMarker(club.name)}
                      >
                        {activeMarker === club.name ? (
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
                            <div>
                              '{club.name}'
                              <br />
                              {club.location}
                            </div>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ))
                  : clubes.map((club, index) => (
                      <Marker
                        key={index}
                        position={positions[index]}
                        icon={{
                          url: "https://i.postimg.cc/wjKd121N/mark-Canchera.png",
                        }}
                        onClick={() => handleActiveMarker(club.name)}
                      >
                        {activeMarker === club.name ? (
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
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
            <ScrollButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListClubs;
