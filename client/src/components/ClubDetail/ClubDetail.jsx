import React, {useState} from 'react';
import Fieldcalendar from '../FieldCalendar/FieldCalendar.jsx'
import {
    setHours,
    setMinutes,
    addDays
} from 'date-fns'
  
const detail = {
    id: 1,
    name: 'La pelota no se mancha',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni',
    location: 'Av. San Martín 1042, CABA',
    openHour: 8,
    closeHour: 22,
    image: 'https://picsum.photos/200/300',
    score: '5',
    fields: [
        {
            id: 1,
            players: 5,
            price: 2500,
            image: 'https://picsum.photos/200/300',
            light: true,
            reservations: ["2022-03-16T11:00:06.449Z", "2022-03-23T11:00:06.449Z"]
            
        },
        {
            id: 2,
            players: 11,
            price: 4500,
            image: 'https://picsum.photos/200/300',
            light: false,
            reservations: ["2022-03-16T12:00:06.449Z", "2022-03-16T13:00:06.449Z"]

         }
    ],
    
}


const Clubdetail = () => {
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
    
    
    return (
       <div className='clubDetail'>
           <img src={detail.image} alt={detail.name} />
           <h1>{detail.name}</h1>
           <h3>{detail.location}</h3>
           <p>{detail.description}</p>
           <p>horario: de {detail.openHour} a {detail.closeHour}</p>
           <h2>Calendario</h2>
           {detail && detail.fields && detail.fields.map( field => (
               
               <Fieldcalendar 
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
 
 

