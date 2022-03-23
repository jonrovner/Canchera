import React from 'react';

import {
    setHours,
    eachHourOfInterval,
    getHours,
    isEqual

} from 'date-fns'
import './fieldCalendar.css'

const FieldCalendar = ({day, close, open, players, bookings, price, handleClick, fieldId, surface}) => {
    
    //console.log('day :', day)

    const hours = eachHourOfInterval({
        start: setHours(day, open),
        end: setHours(day, close)
    }) 
    //console.log('cancha de', players, 'bookings', bookings)
    const bookingDates = bookings.map(b => new Date(b.time))
    
    
    const bookingStrings = bookingDates.map( b => b.toString())
    const hourStrings = hours.map(h => h.toString())
    //console.log('bookings', bookingStrings)
    //console.log('hours', hourStrings)

    
    return (
        <div>
            <div className={'hoursCalendar'}>
            <div className={'fieldInfo'}>
                <h5>{players} jugadores</h5>
                <p>$ {price}</p> 
                <p className='surface'>{surface}</p>   
            </div>

            {
                hourStrings && hourStrings.map( (date, i) => (
                    <div 
                    className={bookingStrings.indexOf(date) !==-1 ? 'hour reserved' : 'hour'} 
                    key={i} 
                    onClick={(e)=>handleClick(e, date, fieldId, price)}
                   
                    >
                        {getHours(hours[i])}hs
                    </div>
                ))
            }

            </div>
        </div>
    );
}

export default FieldCalendar;
