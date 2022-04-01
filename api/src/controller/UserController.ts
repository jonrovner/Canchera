import { Response, Request, NextFunction } from "express";
const { User, Booking, Club, Field } = require('../db.ts');
const bcrypt = require('bcrypt')

module.exports = {

  async getUser (req:Request, res:Response, next:NextFunction ){        
   try {
      const { email } = req.query;

    const user = await User.findOne({where: {email},
    include:{
      model:Booking,
      include:{
        model: Field,
        include: {
          model:Club,
          attributes:['name', 'province', 'ciudad', 'street', 'num']

        }
      }
    }  
    });

       if(user) return res.status(200).json(user);
       else return res.status(201).json({msg:"No existe usuario con este email"})
   } catch (error) {
     next(error)  
   };
  },

  async getOwner (req:Request, res:Response, next:NextFunction ){        
   try {
      const { email } = req.query;

    const owner = await User.findOne({where: {email},
    include:{
      model:Club,
      include:{
        model: Field,
        include: {
          model:Booking,
          attributes:['time'],
          include: {
            model: User,
            attributes:['name', 'email']            
          }
        }
      }
    }  
    });

       if(owner) return res.status(200).json(owner);
       else return res.status(201).json({msg:"No existe dueño con este email"})
   } catch (error) {
     next(error)  
   };
  },





  async updateUser(req:Request, res:Response, next:NextFunction){
    
    const { id } = req.params;
    const { rol, authorized } = req.body;

    try {

      const user = await User.findOne({ where:{ id:id } });
      if(!user) return res.status(400).json({ msg :"No se encuentra en nuestra base de datos"});
      
      if(rol && !authorized) {

        await user.update({
          ...user,
          rol        
        });
      }else if(authorized && !rol){
        await user.update({
          ...user,
          authorized          
        });
      }else {
        await user.update({
          ...user,
          authorized, 
          rol         
        });
      }

      return res.status(200).json({ msg:"Usuario modificado con exito" });
      
    } catch (error) {
      next(error)
    }

  },

 async deleteUser (req:Request, res:Response, next:NextFunction){
    const { id } = req.params;
    try {

        const userDelete = await User.findOne( { where:{ id:id } } );
          
        if(userDelete.rol === "owner"){
          await Club.destroy({
            where:{ UserId:userDelete.id }
          })
          await userDelete.destroy()
        }
        await userDelete.destroy();

       return res.status(200).json({ msg: "Usuario elimindo" });
      
    } catch (error) {
      next(error)
    }

 },

 async getAllUsers(req:Request, res:Response, next:NextFunction){    
  try {
    const user = await User.findAll({
      attributes:['id','name', 'rol', "authorized"]
    });

    return res.status(200).json(user)

  } catch (error) {
    next(error)
  }
 },

};