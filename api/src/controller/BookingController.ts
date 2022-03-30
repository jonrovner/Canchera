import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
const { Field, Booking, User, Club } = require('../db.ts');
const { sendEmailBooking, getTemplateBooking } = require('../config/email');


module.exports = {

async postBooking(req:Request, res:Response, next:NextFunction){

 const { userId, dates } = req.body
 console.log(userId);
 console.log(dates);
 

 try {
    if(!userId || dates.length === 0) return res.status(400).json({
        msg:"Faltan datos para poder procesar su reserva"
    });

    const user = await User.findOne({ where:{id:userId} });
      console.log(user);

    const bookings = [];
    for(let i = 0; i < dates.length; i++){
        const newBooking = await Booking.create({
            time: dates[i].time,
            UserId: userId,
            FieldId: dates[i].field
        });
        bookings.push(newBooking);
      };
      const [booking] = [...bookings];
      const field = await Field.findOne({ where:{ id:booking.FieldId } })
      const club = await Club.findOne({ where:{ name:field.ClubName } })
     
      
      let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nobiembre', 'Diciembre']
      let times = bookings.map((booking:any) => {
       let date = new Date(booking.time);
       let hora = date.getHours();
       var dia = date.getDay();
       let mes = meses[date.getMonth()];
        
       return `es el dia ${dia} de ${mes}: a las ${hora}hs ⚽⚽ `;
         
      } );
      
      const templateBooking = getTemplateBooking(user.name, times, club.name, club.image );
      await sendEmailBooking(user.email, "Reserva realizada", templateBooking);
      

   return res.status(200).json(bookings)      

 } catch (error) {
     next(error)
 }

},

async getBookings(req:Request, res:Response, next:NextFunction){ 
   
    const { clubName } = req.params;
    if(!clubName) return res.status(400).json({msg:"Falta el id del club"});
    try {
     const fields = await Field.findAll({where:{name: clubName},
         attributes:['name', 'players', 'price', "image", "light"],
         include:{
             model:Booking,
             attributes:['id', 'time', 'paymentPending', "UserId"]
         }
       });
     
       return res.status(200).json(fields);
     
    } catch (error) {
        next(error)       
    }
 
  },

  async deleteBooking(req:Request, res:Response, next:NextFunction){

    const {userId} = req.params;
    const { bookings } = req.body
     
    let reservas = bookings.filter((booking:any) => userId === booking.UserId );
     
      let reservasId:any = [];

     reservas.forEach((reserva:any) => {
            reservasId.push(reserva.id);
     });

    Booking.destroy({ where:{ id:reservasId } });

    return res.status(200).json({msg :"cancelada con exito"});

  },


}



