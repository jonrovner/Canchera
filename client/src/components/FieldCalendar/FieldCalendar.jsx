import React from 'react';

import {
    setHours,
    eachHourOfInterval,
    getHours,

} from 'date-fns'
import './fieldCalendar.css'

const FieldCalendar = ({day, close, players, ilumination, price, handleClick, fieldId}) => {
    
    console.log('day :', day)

    const hours = eachHourOfInterval({
        start: day,
        end: setHours(day, close)
    }) 
    
    return (
        <div>
            <h5>cancha de {players}</h5>
            <div className={'hoursCalendar'}>

            {
                hours && hours.map( (date, i) => (
                    <div className={'hour'} key={i} onClick={()=>handleClick(date, fieldId)}>
                        {getHours(date)}hs
                    </div>
                ))
            }

            </div>
        </div>
    );
}

export default FieldCalendar;
