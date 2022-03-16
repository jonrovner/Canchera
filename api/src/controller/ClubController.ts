import { Request, Response, NextFunction } from "express";
const { Club, Field, User } = require('../db.ts');


module.exports = {

async postClub(req:Request, res:Response, next:NextFunction){

 const { name, description, location, openHour, closeHour, image, score, userId } = req.body

 try {
    if(!name || !location || !openHour || !closeHour) return res.status(400).json({
        warning:"Datos necesatios para poder publicar su club"
    });

    const user= await User.findOne({where:{id:userId}}) 

    const club = await Club.findOne({where:{ UserId: userId }})

    if(user && user.rol === "owner" && !club){

        const newClub = await Club.create({
            name:name,
            description:description,
            location:location,
            openHour:openHour,
            closeHour:closeHour,
            image:image,
            score:score,
            UserId:userId 
        });
         return res.status(200).json(newClub)
    }else{
        res.status(400).json({error:"no se puede crear"})
    }
    
    

 } catch (error) {
     next(error)
 }

},

async getClubs(req:Request, res:Response, next:NextFunction){

const { name } = req.query;

try {
    if(name){
        const nameClub = await Club.findOne({where:{name:name}});
        if(!nameClub) return res.status(401).json({ Message:"No hay clubes con ese name " });
        let clubName = {
            name:nameClub.name,
            description:nameClub.description,
            location:nameClub.location,
            openHour:nameClub.openHour,
            closeHour:nameClub.closeHour,
            image:nameClub.image,
            score:nameClub.score,
            userId:nameClub.UserId,
            latitude:nameClub.latitude,
            longitude:nameClub.longitude
        }
        return res.status(200).json(clubName);
    }
    
    const foundClub = await Club.findAll({
        attributes:['name', 'description', 'location', 'openHour','closeHour', 'image', 'score', 'UserId', 'latitude', 'longitude'],        
    })
    return res.status(200).json(foundClub);
} catch (error) {
    next(error)
};

},

}