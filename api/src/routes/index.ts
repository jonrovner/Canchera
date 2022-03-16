import {Router, Request, Response} from "express"

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios');

 const SignUp = require('./signup');
 const User = require('./user')
 const Field = require('./field')

const router = Router();


// Configurar los routers

 router.use('/', SignUp);
 router.use('/', User)
 router.use('/', Field)


module.exports = router;