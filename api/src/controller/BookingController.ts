import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
const { Field, Booking } = require('../db.ts');


module.exports = {

async postBooking(req:Request, res:Response, next:NextFunction){

 const { userId, dates } = req.body
 console.log(userId);
 console.log(dates);
 

 try {
    if(!userId || dates.length === 0) return res.status(400).json({
        msg:"Faltan datos para poder procesar su reserva"
    });
    const bookings = [];
    for(let i = 0; i < dates.length; i++){
        const newBooking = await Booking.create({
            time: dates[i].time,
            UserId: userId,
            FieldId: dates[i].field
        });
        bookings.push(newBooking);
    }

   return res.status(200).json(bookings)      

 } catch (error) {
     next(error)
 }

},

async getBookings(req:Request, res:Response, next:NextFunction){ 
   
    const { clubId } = req.params;
    if(!clubId) return res.status(400).json({msg:"Falta el id del club"});
    try {
     const fields = await Field.findAll({where:{ClubId: clubId},
         attributes:['id', 'players', 'price', "image", "light"],
         include:{
             model:Booking,
             attributes:['id', 'time', 'paymentPending', "UserId"]
         }
       });
     
       return res.status(200).json(fields);
     
    } catch (error) {
        next(error)       
    }
 
  }


}



