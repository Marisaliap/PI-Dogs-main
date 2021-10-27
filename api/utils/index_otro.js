const { Router } = require('express');
const dogsRoute = require("./dogs")
const temperamentRoute = require("./temperament")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

/* const { URL_API, API_KEY } = process.env
 */
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", dogsRoute);   //en / usá dogsRoute
router.use("/", temperamentRoute); 

module.exports = router;
