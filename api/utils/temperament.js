const { Router } = require('express');
const router = Router();
const { Temperament } = require ("../db.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/temperament", async (req, res, next) => {
    try{
        const temperament = await Temperament.findAll() 
        res.send(temperament)
    }
    catch (error) { 
        next(error)
    }
})

router.post("/temperament", (req, res, next) => {
    const {name} = req.body
    return Temperament.create({ name })
    .then((newTemperament) => {
        res.status(201).send(newTemperament)
    })
    .catch(error => next(error))
})

router.put("/", (req, res, next) => {
    res.send("soy put /temperament")
})

router.delete("/", (req, res, next) => {
    res.send("soy delete /temperament")
})

module.exports = router;