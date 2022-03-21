import { Request, Response, NextFunction } from "express";
const { User } = require("../db.ts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.js");
const { sendEmail, getTemplate } = require('../config/email')

module.exports = {
  //Login
  signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user: any) => {
         
        if(user.status !== true) res.json({ msg:"Antes de loguearte confirma el mail que te fue enviado" })

        if (!user) {
          res
            .status(201)
            .json({ msg: "Usuario con este correo no encontrado" });
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ user: user }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });
            res.json({ user: user, token: token });
          } else {
            res.status(202).json({ msg: "Contraseña incorrecta" });
          }
        }
      })
      .catch((err: any) => {
        res.status(500).json(err);
      });
  },

  async userSignUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name) return res.json({ error: "Nombre es requerido." });
    if (!email) return res.json({ error: "Email es requerido." });
    if (!password) return res.json({ error: "Password es requerido." });

    let encryptedPassword = bcrypt.hashSync(password, +authConfig.rounds);

    let newUser = {
      name,
      email,
      password: encryptedPassword,
      rol: "user",
      //status: true,
    };

    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: newUser,
    });

    // si created es true, el usuario fue registrado con exito.
    // de lo contrario, ese mail ya esta registrado
    if (created) {
      const token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });

      return res.json({
        user,
        token,
      });
    }

    return res.json({ error: "Ese email ya esta registrado." });
  },

  async ownerSignUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name) return res.json({ error: "Nombre es requerido." });
    if (!email) return res.json({ error: "Email es requerido." });
    if (!password) return res.json({ error: "Password es requerido." });

    let encryptedPassword = bcrypt.hashSync(password, +authConfig.rounds);

    let newUser = {
      name,
      email,
      password: encryptedPassword,
      rol: "owner",
      //status: false,
    };

    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: newUser,
    });

    // si created es true, el usuario fue registrado con exito.
    // de lo contrario, ese mail ya esta registrado
    if (created) {
      const token = jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });
   
      
      const template = getTemplate(name, token);
      await sendEmail(email, "Comunidad de Canchera", template );

      return res.json({
        user,
        token,
      });
    }

    return res.json({ error: "Ese email ya esta registrado." });
  },

  async googleSingUp(req: Request, res: Response) {
    const { name, email } = req.body;

    let newUser = {
      name,
      email,
      rol: "user",
      status: true,
    };

    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: newUser,
    });

    if (!created)
      return res.json({ message: "Ya existe una cuenta con este email" });
    return res.json(user);
  },

  async confirmUser(req:Request, res:Response, next:NextFunction){
     const { token } = req.params;

     try {
       const data = await jwt.verify(token, authConfig.secret);
       
      
       if(data === null) res.json({ msg:"Error al obtener la data" });

       const { user } = data;
       
       
      
       const usuario = await User.findOne({ where:{email:user.email}});

       if(!usuario) return res.json({ msg:"Error en la validacion" });

       await usuario.update({
         ...usuario,
         status:true
       });

       return res.redirect("http://localhost:3000/login");

     } catch (error) {
       next(error)
     }

  }

};
