import {Request, Response} from 'express';
const  { User } = require("../db.ts");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.js')

module.exports = {
    //Login
    signIn(req: Request, res: Response) {

        const {email, password} = req.body;

        User.findOne(
            {where: {
                email: email
            } 
        }).then((user: any) =>{
            if(!user) {
                res.status(404).json({msg: "Usuario con este correo no encontrado"})
            }else{
               if(bcrypt.compareSync(password, user.password)){
                 const token = jwt.sign({user: user}, authConfig.secret, {
                        expiresIn: authConfig.expires
                });
                res.json({user: user, token: token});            

               }else {
                   res.status(401).json({msg: "Contraseña incorrecta"})
               }
            }

        }).catch((err: any) =>{
           res.status(500).json(err) 
        })

    },

    userSignUp(req: Request, res: Response) {
        const {name, email, password } = req.body;

        let encryptedPassword = bcrypt.hashSync(password, +authConfig.rounds);

        User.create({
            name,
            email,
            password: encryptedPassword,
            rol: 'user',
            status: true,
        }).then((user: any) => {
            
            const token = jwt.sign({user: user}, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            
            res.json({
                user,
                token
            });
        }).catch((err: any) => {
            res.status(500).json(err)
        })
    },

    ownerSignUp(req: Request, res: Response) {
        const {name, email, password } = req.body;

        let encryptedPassword = bcrypt.hashSync(password, +authConfig.rounds);

        User.create({
            name,
            email,
            password: encryptedPassword,
            rol: 'owner',
            status: false,
        }).then((user: any) => {
            
            const token = jwt.sign({user: user}, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            
            res.json({
                user,
                token
            });
        }).catch((err: any) => {
            res.status(500).json(err)
        })
        
    }
}