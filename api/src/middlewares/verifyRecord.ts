import { Response, Request, NextFunction } from "express";
const { User } = require('../db.ts');

module.exports ={

async verifyUser(req: Request, res:Response, next:NextFunction){
    const { email } = req.body;
   const userEmail = await User.findOne({ where:{ email:email } })
   if(userEmail) return res.status(204).json({ warning:"Este email ya esta en uso" });
   next();
}

};