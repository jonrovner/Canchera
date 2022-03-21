import React, {useState, useEffect} from 'react';
import FieldCalendar from '../FieldCalendar/FieldCalendar.jsx'
import {
    setHours,
    setMinutes,
    addDays
} from 'date-fns'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { get_club_detail } from '../../redux/action/index.js';

const Clubdetail = () => {
    const params = useParams()
    const dispatch = useDispatch()
   
   
    useEffect(() => {
        dispatch(get_club_detail(params.id))
        
    }, [dispatch, params.id]);

    const club = useSelector(state => state.clubDetail)
    console.log('club detail', club)

    const now = new Date()
    const today = club && setMinutes(setHours(now, club.openHour), 0)
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedDates, setSelectedDates] = useState([])

    const days = [today]
    
    for (let i=1; i<15; i++){
        days[i] = addDays(today, i)

    }
    
    const handleHourClick = (date) => {
        let existent = selectedDates.find( d => d.toString() === date.toString())
        if (!existent){
            setSelectedDates([...selectedDates, date])
        }
        else {
            setSelectedDates([...selectedDates.filter(d => d.toString() !== date.toString())])
        }
    }

    const handleReservation = () => {
        if (!selectedDates.length) {
            return
        }        
    }
    
    //console.log('fields', club.fields)
    
    return (
        <div>

        {
            club && (<div className='clubDetail'>
            <img src={club.image} alt={club.name} />
            <h1>{club.name}</h1>
            <h3>{club.location}</h3>
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
                handleClick={handleHourClick}/>
            ))}
    
            <button onClick={()=>handleReservation}>Reservar</button>
     
           
        </div>) 

        }

        </div>

        
            
       
   );
}
 
export default Clubdetail;
 
 

