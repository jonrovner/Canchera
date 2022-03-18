import {Request, Response, NextFunction} from 'express';
import { nextTick } from 'process';
const { Field, Club } = require("../db.ts")



module.exports = {
    async postField(req: Request, res: Response, next: NextFunction) {
    
        try {
            const {clubId, players, price, image, light, surface} = req.body;
            
            if(!players || !price) return res.status(400).json({msg: "Los campos de jugadores y precio son obligatorios"})

            const club = await Club.findOne({where: {id: clubId}})
            if(club){
                const field = await Field.create({
                    players,
                    price,
                    image,
                    light,
                    ClubId: clubId,
                    surface

                });
                res.json(field);
            }else return res.status(400).json({msg: "El club asociado no existe"})
        }catch(error){
            next(error)
        }
    },

    async getFields (req: Request, res: Response, next: NextFunction) {
        const { clubId } = req.query;

        if(clubId) {
            try {
                const fields = await Field.findAll({where: {ClubId: clubId}});
                
                if(fields.length > 0) {
                    res.json(fields);
                } else return res.status(404).json({msg: "Este club no tiene canchas asociadas"});
            }catch(error) {
                res.status(401).send(error)
            }
        }else {

            try{
                const fields = await Field.findAll();    
                
                if(fields.length > 0) {
                    res.json(fields);
                } else return res.status(404).json({msg: "No hay canchas disponibles en este momento"});
            
            }catch(error) {
                res.status(401).send(error)
            }
        }
    }

}