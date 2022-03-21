import React, {useState} from 'react';
import FieldCalendar from '../FieldCalendar/FieldCalendar.jsx'
import {
    setHours,
    setMinutes,
    addDays
} from 'date-fns'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const Clubdetail = () => {
    const params = useParams()
    const clubs = useSelector( state => state.clubes)
    
    console.log(clubs)
    const detail = clubs && clubs.find( club => club.id === params.id)
    

    const now = new Date()
    const today = setMinutes(setHours(now, detail.openHour), 0)
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
    
    console.log('fields', detail.fields)
    
    return (
       <div className='clubDetail'>
           <img src={detail.image} alt={detail.name} />
           <h1>{detail.name}</h1>
           <h3>{detail.location}</h3>
           <p>{detail.description}</p>
           <p>horario: de {detail.openHour} a {detail.closeHour}</p>
           <h2>Calendario</h2>
           {detail && detail.Fields && detail.Fields.map( field => (
               
               <FieldCalendar 
               day={selectedDay}
               close={detail.closeHour}
               players={field.players}
               ilumination={field.ilumination}
               price={field.price} 
               handleClick={handleHourClick}/>
           ))}

           <button onClick={()=>handleReservation}>Reservar</button>
    
          
       </div>
   );
}
 
export default Clubdetail;
 
 

