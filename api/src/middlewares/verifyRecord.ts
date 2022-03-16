import { Response, Request, NextFunction } from "express";
const { User } = require('../db.ts');



module.exports ={

async verifyUser(req: Request, res:Response, next:NextFunction){
  
    const { name, email } = req.body;
    
   const userName = await User.findOne({ where:{name:name} })
   if(userName) return res.status(401).json({ warning:"Ya existe un usuario con este name" });

   const userEmail = await User.findOne({ where:{ email:email } })
   if(userEmail) return res.status(401).json({ warning:"Este email ya esta en uso" });

   next();
}

};