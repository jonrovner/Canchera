import { Request, Response, NextFunction } from "express";
const { Club, Field, User, Booking } = require("../db.ts");

module.exports = {
  async postClub(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      description,
      location,
      openHour,
      closeHour,
      image,
      latitude,
      score,
      longitude,
      userId,
      fields,
    } = req.body;

    try {
      if (!name || !location || !openHour || !closeHour)
        return res.status(400).json({
          warning: "Datos necesatios para poder publicar su club",
        });

      const user = await User.findOne({ where: { id: userId } });

      //const club = await Club.findOne({where:{ UserId: userId }})

      if (user && user.rol === "owner") {
        const newClub = await Club.create({
          name: name,
          description: description,
          location: location,
          openHour: openHour,
          closeHour: closeHour,
          image: image,
          score: score,
          latitude: latitude,
          longitude: longitude,
          UserId: userId,
          lowestPrice: Math.min(
            ...fields.map((field: any) => Number(field.price))
          ),
        });

        await fields.forEach((fieldInArray: any) => {
          Field.create({
            ...fieldInArray,
            ClubId: newClub.name,
          });
        });

        return res.status(200).json(newClub);
      } else {
        res.status(400).json({ error: "no se puede crear" });
      }
    } catch (error) {
      next(error);
    }
  },

  async getClubs(req: Request, res: Response, next: NextFunction) {
    const { clubName } = req.query;

    try {
      if (clubName) {
        const nameClub = await Club.findOne({
          where: { name: clubName },
          attributes: [            
            "name",
            "description",
            "location",
            "openHour",
            "closeHour",
            "image",
            "score",
            "latitude",
            "longitude",
            "lowestPrice",
          ],
          include: {
            model: Field,
            attributes: ["players", "price", "light", "surface"],
          },
        });
        if (!nameClub)
          return res
            .status(401)
            .json({ Message: "No hay clubes con ese nombre " });
        return res.status(200).json(nameClub);
      }

      const foundClub = await Club.findAll({
        attributes: [          
          "name",
          "description",
          "location",
          "openHour",
          "closeHour",
          "image",
          "score",
          "latitude",
          "longitude",
          "lowestPrice",
        ],
        include: {
          model: Field,
          attributes: ["players", "price", "light", "surface"],
        },
      });
      return res.status(200).json(foundClub);
    } catch (error) {
      next(error);
    }
  },

  async clubDetail(req: Request, res: Response, next: NextFunction) {
    const { clubName } = req.params;

    try {
      const detailClub = await Club.findOne({
        where: { name: clubName },
        attributes: [
          "name",
          "description",
          "location",
          "openHour",
          "closeHour",
          "image",
          "score",
          "latitude",
          "longitude",
        ],
        include: {
          model: Field,
          attributes: ["id", "players", "price", "surface"],
          include: {
            model: Booking,
            attributes: ["time"]
          }
        },
      });

      return res.status(200).json(detailClub);
    } catch (error) {
      next(error);
    }
  },
};
