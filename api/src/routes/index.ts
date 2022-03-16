import {Router, Request, Response} from "express"
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios');
// const PokemonRoutes = require('./pokemonRoutes');
 const SignUp = require('./signup');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/', SignUp);
// router.use('/types', TypeRoutes);

module.exports = router;