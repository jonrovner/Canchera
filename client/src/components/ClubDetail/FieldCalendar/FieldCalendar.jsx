import React from 'react';

import {
    setHours,
    eachHourOfInterval,
    getHours,
    isEqual

} from 'date-fns'
import './fieldCalendar.css'

const FieldCalendar = ({day, close, open, players, bookings, price, handleClick, handleInfo, fieldId, surface, user}) => {
    
    //console.log('day :', day)

    const hours = eachHourOfInterval({
        start: setHours(day, open),
        end: setHours(day, close)
    }) 
    //console.log('cancha de', players, 'bookings', bookings)
    const bookingDates = bookings.map(b => new Date(b.time))
    const users = user==='owner' && bookings.map( b => ({name: b.User.name, email: b.User.email}))
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
                    onClick={(e)=>{
                        if (user === 'owner'){
                            console.log('user is owner')
                            if(bookingStrings.indexOf(date) !==-1){
                                console.log('hour is reserved')
                                handleInfo(e, fieldId, bookings[bookingStrings.indexOf(date)])
                            }
                            else{
                                console.log('hour is not reserved')
                            }
                        }
                        else {
                            console.log('user is user')
                            handleClick(e, date, fieldId, price)}}
                        }
                   
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
