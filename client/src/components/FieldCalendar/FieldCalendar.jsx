import React from 'react';

import {
    setHours,
    eachHourOfInterval,
    getHours,

} from 'date-fns'
import './fieldCalendar.css'

const FieldCalendar = ({day, close, players, bookings, price, handleClick, fieldId}) => {
    
    //console.log('day :', day)

    const hours = eachHourOfInterval({
        start: day,
        end: setHours(day, close)
    }) 
    console.log('field', fieldId, 'field bookings', bookings)
    
    return (
        <div>
            <div className={'hoursCalendar'}>
            <h5>cancha de {players}</h5>

            {
                hours && hours.map( (date, i) => (
                    <div className={'hour'} key={i} onClick={(e)=>handleClick(e, date, fieldId)}>
                        {getHours(date)}hs
                    </div>
                ))
            }

            </div>
        </div>
    );
}

export default FieldCalendar;
