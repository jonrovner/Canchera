import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
const { Club, Field, User, Booking } = require('../db.ts');


module.exports = {

async postBooking(req:Request, res:Response, next:NextFunction){

 const { userId, dates } = req.body

 try {
    if(!userId || dates.length === 0) return res.status(400).json({
        warning:"Faltan datos para poder procesar su reserva"
    });
    const bookings = [];
    for(let i = 0; i < dates.length; i++){
        const newBooking = await Booking.create({
            time: dates[i].date,
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

// async getClubs(req:Request, res:Response, next:NextFunction){

// const { name } = req.query;

// try {
//     if(name){
//         const nameClub = await Club.findOne({where:{name:name},
//          attributes:['name', 'description', 'location', 'openHour','closeHour', 'image', 'score', 'UserId', 'latitude', 'longitude'],
//          include:{
//              model:Field,
//              attributes:['id', 'players', 'price']
//          }
        
//         });
//         if(!nameClub) return res.status(401).json({ Message:"No hay clubes con ese name " });
//         return res.status(200).json(nameClub);
//     }
    
//     const foundClub = await Club.findAll({
//         attributes:['name', 'description', 'location', 'openHour','closeHour', 'image', 'score', 'UserId', 'latitude', 'longitude'], 
//         include:{
//             model:Field,
//             attributes:['id', 'players', 'price']
//         }       
//     })
//     return res.status(200).json(foundClub);
// } catch (error) {
//     next(error)
// };

// },

}



