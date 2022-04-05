import { timeStamp } from "console";
import { Request, Response, NextFunction } from "express";
import { DATE, Op } from "sequelize";
const { Field, Booking, User, Club } = require("../db.ts");
const {
  sendEmailBooking,
  getTemplateBooking,
  sendEmailInvitation,
  getTemplateInvitation,
} = require("../config/email");
const mercadopago = require("mercadopago");

module.exports = {
  async postBooking(req: Request, res: Response, next: NextFunction) {
    const { userId, dates } = req.body;

    try {
      if (!userId || dates.length === 0)
        return res.status(400).json({
          msg: "Faltan datos para poder procesar su reserva",
        });

      const user = await User.findOne({ where: { id: userId } });

      const bookings = [];
      for (let i = 0; i < dates.length; i++) {
        const [book, created] = await Booking.findOrCreate({
          where: {
            UserId: userId,
            time: dates[i].time,
            FieldId: dates[i].field,
          },
        });
        bookings.push(book);
      }

      const field = await Field.findOne({ where: { id: dates[0].field } });
      const club = await Club.findOne({ where: { name: field.ClubName } });

      let meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      let times = bookings.map((booking: any) => {
        let date = new Date(booking.time);
        let hora = date.getHours();
        let dia = date.getDate();
        let mes = meses[date.getMonth()];
        return ` Dia ${dia} de ${mes}: a las ${hora}hs ⚽⚽`;
      });

      const templateBooking = getTemplateBooking(
        user.name,
        "<ul style='font-size:24px'; 'font-weight:bold'><li>" +
          times.join("</li><li>") +
          "</li></ul>",
        club.name
      );

      await sendEmailBooking(user.email, "Reserva realizada", templateBooking);

      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  },

  async getBookings(req: Request, res: Response, next: NextFunction) {
    const { clubName } = req.params;
    if (!clubName) return res.status(400).json({ msg: "Falta el id del club" });
    try {
      const fields = await Field.findAll({
        where: { name: clubName },
        attributes: ["name", "players", "price", "image", "light"],
        include: {
          model: Booking,
          attributes: ["id", "time", "paymentPending", "UserId", "rated"],
        },
      });

      return res.status(200).json(fields);
    } catch (error) {
      next(error);
    }
  },

  async deleteBooking(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { bookings } = req.body;

    let reservas = bookings.filter((booking: any) => userId === booking.UserId);

    let reservasId: any = [];

    reservas.forEach((reserva: any) => {
      reservasId.push(reserva.id);
    });

    Booking.destroy({ where: { id: reservasId } });

    return res.status(200).json({ msg: "cancelada con exito" });
  },

  async bookingInvitation(req: Request, res: Response, next: NextFunction) {
    const { emails } = req.body;
    const { bookingId } = req.params;
    try {
      const bookings = await Booking.findAll({ where: { id: bookingId } });

      const [booking] = [...bookings];

      const user = await User.findOne({ where: { id: booking.UserId } });

      const field = await Field.findOne({ where: { id: booking.FieldId } });
      const club = await Club.findOne({ where: { name: field.ClubName } });

      let meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      let times = bookings.map((booking: any) => {
        let date = new Date(booking.time);
        let hora = date.getHours();
        var dia = date.getDate();
        let mes = meses[date.getMonth()];

        return `Dia ${dia} de ${mes}: a las ${hora}hs ⚽⚽`;
      });

      await emails.forEach((email: any) => {
        let template = getTemplateInvitation(
          user.name,
          "<ul style='font-size:24px'; 'font-weight:bold'><li>" +
            times.join("</li><li>") +
            "</li></ul>",
          club.name
        );
        sendEmailInvitation(email, "Invitacion de Juego", template);
      });

      return res.status(200).json({ msg: "invitaciones enviadas" });
    } catch (error) {
      next(error);
    }
  },

  async setScore(req: Request, res: Response, next: NextFunction) {

    const { bookingId, rating } = req.body;

    const booking = await Booking.findOne({ where: { id: bookingId } });

    if (!booking.rated) {
      const field = await Field.findOne({ where: { id: booking.FieldId } });
      const club = await Club.findOne({ where: { name: field.ClubName } });

      let { score, totalRatings } = club;

      score = (score * totalRatings + rating) / (totalRatings + 1);

      const clubUpdated = await club.update({
        score,
        totalRatings: totalRatings + 1,
      });

      const bookingUpdated = await booking.update({
        rated: true,
      });

      return res.json({ bookingUpdated });
    }
    return res.json({ booking });
  },
};
