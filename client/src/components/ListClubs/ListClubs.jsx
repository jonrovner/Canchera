import React, { useEffect, useState } from "react";
import styles from "./ListClubs.module.sass";
import axios from "axios";
import CardClub from "../CardClub/CardClub";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import ScrollButton from "../ScrollButton/ScrollButton";
import NavBar from "../NavBar/NavBarSinSearch";
import Footer from "../Footer/FooterNoVideo";
import { AiOutlineSearch } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";


const ListClubs = () => {

  const [clubs, setClubs] = useState([])
  const [filterClubs, setFilterClubs] = useState([])
  const [cities, setCities] = useState([])
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapPos, setMapPos] = useState({ lat: -32.9632, lng: -61.409 });
  const [zoom, setZoom] = useState(4);  
  const [input, setInput] = useState({
    ciudad: "",
    size: "",
    clubName: "",
  });
  
  useEffect(() => {
    const getClubs = async () =>{
      let res = await axios.get(`/club`)
      setClubs(res.data.map((club) => ({
        ...club,
        pos: { lat: club.latitude, lng: club.longitude },
      })))

    }
    getClubs()
  }, []);

  useEffect(()=> {
    setFilterClubs(clubs)
    setCities([...new Set(clubs.map(c => c.ciudad))])
  },[clubs])
        
  

  const handleFilter = () => {
    let { ciudad, size, clubName } = input;
    let newClubes = filterClubs.length && [...filterClubs];
    // filtro por ciudad, si es que existe.    
    if (ciudad) {
      newClubes = newClubes.filter((club) =>
        club.ciudad.toUpperCase().includes(ciudad.toUpperCase())
      );     
      setMapPos(newClubes[0].pos)
      setZoom(12)       
    }    
    // filtro por size, si es que existe.
    if (size) {
      newClubes = newClubes.filter((club) => {
        let test = club.Fields.map((field) => {
          return field.players;
        });
        return test.includes(+size);
      });
    }  
    // filtro por clubName si es que existe.
    if (clubName) {
      newClubes = newClubes.filter((club) =>
        club.name.toUpperCase().includes(clubName.toUpperCase())
      );
    }  
    // devuelvo lo que haya quedado en clubes.
    setFilterClubs(newClubes);
  };


  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const [mapFilter, setMapFilter] = useState(false);
  const handleMapFilter = () => {
    setMapFilter(!mapFilter);
  };

  const [mapBounds, setMapBounds] = useState({
    "Ab": {
      "h": -53.599458918451724,
      "j": -6.152205029798327
    },
    "Ua": {
      "h": -80.393375,
      "j": -42.424625000000006
    }
  });
  
  
  useEffect(() => {
    if (clubs.length && mapFilter) {
      let filtered = clubs.filter((club) =>
        mapBounds.contains && mapBounds.contains(club.pos)
      );
      setFilterClubs(filtered);
    }
  }, [mapBounds, clubs.length]);


  const handleSubmit = async (e) => {
    e.preventDefault();   
    if (!input.ciudad) {
      setMapPos({ lat: -32.9632, lng: -61.409 });
      setZoom(4);      
    } else {
      handleFilter()
    }
  };

  const onChange = async (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
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

  const vaciarInput = async () => {
    setInput({
      ciudad: "",
      size: "",
      clubName: "",
    });
    setFilterClubs(clubs)
    setMapPos({ lat: -32.9632, lng: -61.409 });
    setZoom(4);
  };

  console.log("clubes: ", clubs);
  console.log('cities: ', cities);
  console.log("filterClubs: ", filterClubs);
  
  
  return (
    <div className={styles.ListClubs}>
      <div className={styles.nonFooter}>
        <NavBar />
        <div className={styles.Container}>
          <div className={styles.search}>
            <div className={styles.orderScore}>
              Ordenar por Calificación
              <div>
                <button onClick={() => {
                  let clubes = [...filterClubs.sort((a,b) => b.score-a.score)]
                  setFilterClubs(clubes)}}>
                  <BsArrowUpCircleFill />
                </button>
                <button onClick={()=>{
                  let clubes = [...filterClubs.sort((a,b)=> a.score-b.score)]
                  setFilterClubs(clubes)
                }}>
                  <BsArrowDownCircleFill />
                </button>
              </div>
            </div>
            <div className={styles.searchBar}>
              {(input.ciudad || input.size || input.clubName) && (
                <button className={styles.vaciarInput} onClick={vaciarInput}>
                  <ImCross className={styles.deleteIcon} />
                  Vaciar campos de busqueda
                </button>
              )}
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
                    {cities.length &&
                      cities
                        .map((city, i) => <option key={i} value={city} />)}
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
              {filterClubs.length && (
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
              ) }
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
                {filterClubs.length
                  && filterClubs.map((club, index) => (
                      <Marker
                        key={index}
                        position={club.pos}
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
