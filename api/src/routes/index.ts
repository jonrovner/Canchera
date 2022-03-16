import {Router, Request, Response} from "express"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios');
// const PokemonRoutes = require('./pokemonRoutes');
 const SignUp = require('./signup');
 const User = require('./user')
 const Club = require('./club')

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/', SignUp);
 router.use('/', User)
 router.use('/', Club);
// router.use('/types', TypeRoutes);

module.exports = router;