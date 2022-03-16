import React, {useState} from 'react';

import {
    setHours,
    eachHourOfInterval,
    getHours,

} from 'date-fns'
import './fieldCalendar.css'

const Fieldcalendar = ({day, close, players, ilumination, price, handleClick}) => {
    
    console.log('day is ', day)
    
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
                        <div className={'hour'} key={i} onClick={()=>handleClick(date)}>
                            {getHours(date)}hs
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default Fieldcalendar;
