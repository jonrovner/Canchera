import { Response, Request, NextFunction } from "express";
const { User } = require('../db.ts');

module.exports = {

  async getUser (req:Request, res:Response, next:NextFunction ){
    
   try {
    const users = await User.findAll({
        attributes:["name" ,"email"]
       });

       return res.status(200).json(users);

   } catch (error) {
     next(error)  
   };
  }

};