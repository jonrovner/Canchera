import React, {useState} from 'react';
import FieldForm from './FieldForm';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios';
import './createClub.css'

const CreateClub = () => {
    const map_token = 'pk.eyJ1Ijoiam9ucm92bmVyIiwiYSI6ImNsMHdhcnk5YjAxdWMzYm8yeTB4MnIyNHcifQ.dV464viDiNV2RkaMQZ7PZQ'

    
    const [ input, setInput] = useState({fields: []}) 
    const [ location, setLocation] = useState("")
    const [ latLong, setLatLong] =  useState({})   

    const handleSubmit = (e) => {
        e.preventDefault()
  
    }

    const handleInput = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setInput({...input, [name]: value})
    }   

    const fieldInput = (e, field) => {
        e.preventDefault()
        setInput({...input, fields: [...input.fields, field]})
    }

    const findMap = () => {
        const queryString = location.split(" ").join("+")
        console.log('querystring is', queryString)
        axios.get(`https://nominatim.openstreetmap.org/search?q=${queryString}&format=json&polygon_geojson=1&addressdetails=1`)
        .then( res => {
            console.log(res.data)
            setLatLong({lat:res.data[0].lat, lon:res.data[0].lon})
        })
    }
    
    console.log('input is ', input)
    console.log('latLong is', latLong)
    return (
        <div className='createClub'>
            <form onSubmit={(e) => {handleSubmit(e)}}>
            <h3>Complete los datos de su establecimiento</h3>
            <label htmlFor="name">Nombre</label>
            <input onChange={(e)=>handleInput(e)} type="text" name="name" />        
            <br />
            <label htmlFor="descritption">Description</label>
            <input onChange={(e)=>handleInput(e)} type="text" name="description" />
            <br />
            <label htmlFor="location">Location</label>
            <input onChange={(e)=> {handleInput(e)
                                    setLocation(e.target.value)
            }} type="text" name="location" />
            <button onClick={findMap}>find map</button>
            <br />

{   latLong.lat && 
            <MapContainer center={[latLong.lat, latLong.lon]} zoom={13} id="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latLong.lat, latLong.lon]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            
}            
            <label htmlFor="open">horario apertura</label>
            <select onChange={(e)=>handleInput(e)} type="text" name="open">
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
            <label htmlFor="close">horario cierre</label>
            <select onChange={(e)=>handleInput(e)} type="text" name="close">
                <option value="18">6pm</option>
                <option value="19">7pm</option>
                <option value="20">8pm</option>
                <option value="21">9pm</option>
                <option value="22">10pm</option>
                <option value="23">11pm</option>
                <option value="0">12am</option>
             </select>
             <br />
             <p>suba una imagen</p>
            <input name="addPhoto" type='file' ></input> 
            
            
            
            {
                input.fields && input.fields.map( (field, i) => (
                 <div className='field' key={i}>
                     <h3>cancha {i+1}</h3>
                     <p>tamaño: {field.size}</p>
                     <p>precio: {field.price}</p>
                 </div>   
                    
                ))

            }
            <p>agregue sus canchas</p>
            <FieldForm handleInput={fieldInput} />


            



            </form>
            
        </div>
    );
}

export default CreateClub;
