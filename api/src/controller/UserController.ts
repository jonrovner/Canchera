import { Response, Request, NextFunction } from "express";
const { User } = require('../db.ts');
const bcrypt = require('bcrypt')

module.exports = {

  async getUser (req:Request, res:Response, next:NextFunction ){        
   try {
      const { email } = req.query;

    const user = await User.findOne({where: {email}});

       if(user) return res.status(200).json(user);
       else return res.status(201).json({msg:"No existe usuario con este email"})
   } catch (error) {
     next(error)  
   };
  },


  async updateUser(req:Request, res:Response, next:NextFunction){
    
    const { id } = req.params;
    const { name, password, rol } = req.body;

    try {

      const user = await User.findOne({ where:{ id:id } });
      if(!user) return res.status(400).json({ msg :"No se encuentra en nuestra base de datos"});

      if(password){

      let salt = await bcrypt.genSalt(10);
      let newPassword = await bcrypt.hash(password, salt);
      await user.update({
        name:name,
        password:newPassword,
        rol:rol
      });
    }

    await user.update({
      name:name,
      password:user.password,
      rol:rol
    });

      return res.status(200).json({ msg:"Usuario modificado con exito" });
      
    } catch (error) {
      next(error)
    }

  },

 async deleteUser (req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    try {

        const userDelete = await User.findOne( { where:{ id:id } } );
         
        if(!userDelete) res.status(400).json({ msg:"Usuario no encontrado o ya eliminado" });

       await userDelete.destroy();

       return res.status(200).json({ msg: "Usuario elimindo" });
      
    } catch (error) {
      next(error)
    }

 }

};