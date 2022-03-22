import React, {useState, useEffect} from 'react';
import FieldCalendar from '../FieldCalendar/FieldCalendar.jsx'
import {
    setHours,
    setMinutes,
    setSeconds,
    addDays
} from 'date-fns'
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { get_club_detail } from '../../redux/action/index.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios';

const Clubdetail = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()   
   
    useEffect(() => {
        dispatch(get_club_detail(params.id))
        
    }, [dispatch, params.id]);

    const club = useSelector(state => state.clubDetail)
    const user = useSelector(state => state.user)
    
    const now = new Date()
    const today = setSeconds(setMinutes(setHours(now, 8), 0),0)
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedDates, setSelectedDates] = useState([])
    
    const days = [today]
    
    for (let i=1; i<15; i++){
        days[i] = addDays(today, i)
    }
    
    const handleHourClick = (e, date, fieldId) => {
        
        let existent = selectedDates.find( d => d.time.toString() === date.toString())
        if (!existent){
            setSelectedDates([...selectedDates, {time:date, field:fieldId}])
            e.target.classList.add('selected')
        }
        else {
            setSelectedDates([...selectedDates.filter(d => d.time.toString() !== date.toString())])
            e.target.classList.remove('selected')
        }
    }

    const handleReservation = async () => {
              
        console.log('you selected dates', selectedDates)
        const toPost = {userId: user.id, dates: selectedDates}
        const reservation = await axios.post(`http://localhost:3001/booking`, toPost)
        console.log('reservation : ', reservation.data)
        navigate('/clubs')
    }
    //console.log('user : ', user.id)
    //console.log('selected', selectedDates)
    console.log('club detail', club)
    
    return (
        <div>
        {
            club && (<div className='clubDetail'>
            <img src={club.image} alt={club.name} />
            <h1>{club.name}</h1>
            <h3>{club.location}</h3>

            { club.latitude && <MapContainer center={[club.latitude, club.longitude]} zoom={13} id="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[club.latitude, club.longitude]}>
                    
                </Marker>
                
            </MapContainer> }

            <p>{club.description}</p>
            <p>horario: de {club.openHour} a {club.closeHour}</p>
            <h2>Calendario</h2>
            {club && club.Fields && club.Fields.map( field => (
                
                <FieldCalendar 
                day={selectedDay}
                close={club.closeHour}
                players={field.players}
                ilumination={field.ilumination}
                price={field.price} 
                fieldId={field.id}
                bookings={field.Bookings}
                handleClick={handleHourClick}/>
            ))}
    
            <button onClick={()=>handleReservation()}>Reservar</button>
     
           
        </div>) 

        }

        </div>

        
            
       
   );
}
 
export default Clubdetail;
 
 

