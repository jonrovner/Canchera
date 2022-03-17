import { Response, Request, NextFunction } from "express";
const { User } = require('../db.ts');

module.exports = {

  async getUser (req:Request, res:Response, next:NextFunction ){        
   try {
      const { email } = req.query;

    const user = await User.findOne({where: {email}})

       if(user) return res.status(200).json(user);
       else return res.status(201).json({msg:"No existe usuario con este email"})
   } catch (error) {
     next(error)  
   };
  }

};