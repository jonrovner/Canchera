import React from 'react';

const ReservationModal = ({detail, handleReservation}) => {
    
      
    
    
    return (
        <div className="reservationModal">
         <div className="reservationDetails">
             <p>detalles de su reserva:</p>
             <p>{detail.hours} horas reservadas</p>
             <p>total: $ {detail.price}</p>
             <button onClick={() => handleReservation()}>Confirmar</button>
            <div id={"checkout-btn"}></div>
        </div> 
            
        </div>
    );
}

export default ReservationModal;
