import { Request, Response, NextFunction } from "express";
const { Club, Field, User, Booking } = require("../db.ts");
import multer from "multer";

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/").pop();
    let body = JSON.parse(req.body.data);

    cb(null, `${body.name.replace(/ /g, '-')}.${ext}`);
  },
});

const isImage = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("only images allowed"));
  }
};

const postClub = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

module.exports = {
  uploadImage: postClub.single("image"),

  async postClub(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      description,
      ciudad,
      street,
      num,
      province,
      openHour,
      closeHour,
      latitude,
      score,
      longitude,
      userId,
      fields      
    } = JSON.parse(req.body.data);

    console.log('body : ', JSON.parse(req.body.data))

    try {

      if (!name || !openHour || !closeHour || !ciudad || !street || !num || !province)
        return res.status(400).json({
          warning: "Faltan datos para poder publicar su club",
        });

      const user = await User.findOne({ where: { id: userId } });

      let ext = req.file?.filename.split(".").pop();

      //const club = await Club.findOne({where:{ UserId: userId }})

      let url;
      if (process.env.NODE_ENV) {
        url = "https://canchera.herokuapp.com/images/";
      } else {
        url = "http://localhost:3001/images/";
      }

      let image;
      if (req.file) {
        image = `${url}${name.replace(/ /g, '-')}.${ext}`;
      } else {
        image = `${url}club-default.jpg`;
      }

      if (user && user.rol === "owner") {
        const newClub = await Club.create({
          name,
          description,
          ciudad,
          street,
          num:Number(num),

          province,          
          openHour,
          closeHour,
          image,
          score,
          latitude,
          longitude,
          UserId: userId,          
          lowestPrice: Math.min(
            ...fields.map((field: any) => Number(field.price))
          ),
        });

        await fields.forEach((fieldInArray: any) => {
          Field.create({
            ...fieldInArray,
            ClubName: newClub.name,
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
            "ciudad",
            "street",
            "num",
            "province",
            "openHour",
            "closeHour",
            "image",
            "score",
            "latitude",
            "longitude",
            "lowestPrice"           
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
          "ciudad",
          "street",
          "num",
          "province",
          "openHour",
          "closeHour",
          "image",
          "score",
          "latitude",
          "longitude",
          "lowestPrice"         
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
          "ciudad",
          "street",
          "num",
          "province",
          "openHour",
          "closeHour",
          "image",
          "score",
          "latitude",
          "longitude"          
        ],
        include: {
          model: Field,
          attributes: ["id", "players", "price", "surface"],
          include: {
            model: Booking,
            attributes: ["time"],
          },
        },
      });

      return res.status(200).json(detailClub);
    } catch (error) {
      next(error);
    }
  },
};
