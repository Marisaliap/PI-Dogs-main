/*const { Router } = require('express');
const {Op} = require("sequelize")
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const router = Router();
require('dotenv').config();
const{ API_URL, API_KEY } = process.env 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/* router.get("/", (req, res, next) => {
    return Dog.findAll({ 
        include: Temperament    
    })
    .then((dog) => {
        res.send(dog)
    })
    .catch((error) => {
        next(error)
    })
}) */

/*router.get("/", (req, res, next) => {  // combino info de la api mas info de la bd en un solo request
    let name = req.query.name
    let dogPromiseApi
    let dogPromiseDb
    if(name) {
        dogPromiseApi = axios.get(`${API_URL}?api_key=${API_KEY}?name=` + name);    //axios.get es una promesa pero no tengo que hacer .json y me devuelve todo en .data
        dogPromiseDb = Dog.findAll({ 
            include: Temperament,
            where: {
                name: {
                    [Op.iLike]: "%" + name + "%"    //encontramos todos los nombre que sean parecidos
                }
            },
            order: [
                ["name", "ASC"],
            ],
        })
    } else {
        dogPromiseApi = axios.get(`${API_URL}?api_key=${API_KEY}`);    //axios.get es una promesa pero no tengo que hacer .json y me devuelve todo en .data
        dogPromiseDb = Dog.findAll({ 
            include: Temperament,
        })
    }
    Promise.all([
        dogPromiseApi,
        dogPromiseDb
    ])
    .then((respuesta)=> { 
        const [dogApi, dogDb] = respuesta       //los des-estructuro (respuesta es respuesta de la api y respuesta de la bd)
        let filteredDogApi = dogApi.data.map((dog) => {  //.data porque viene de axios - saco los valores que no quiero enviar
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height.metric, //en sistema métrico (tambien viene imperial)
                weight: dog.weight.metric,
                life_span: dog.life_span,
                image: dog.image.url,
                temperament: dog.temperament
            }
        }) 
        let allDogs = [...filteredDogApi, ...dogDb]  //los concateno
        res.send(allDogs)
    })
    .catch(error => next(error))
})

router.get("/:id", (req, res, next) => {  // combino info de la api mas info de la bd en un solo request
    let id = req.query.id
    let dogPromiseApi
    let dogPromiseDb
    if(id) {
        dogPromiseApi = axios.get(`${API_URL}?api_key=${API_KEY}?name=` + id);    //axios.get es una promesa pero no tengo que hacer .json y me devuelve todo en .data
        dogPromiseDb = Dog.findAll({ 
            include: Temperament,
        })
    .then((respuesta)=> {
        const dogId = dogPromiseApi.concat(dogPromiseDb).filter((el) => el.id == id);
            dogId.length
            ? res.status(200).send(respuesta)
            : res.status(404).send({ info: "The dog you are looking for is not available." });
            console.log(respuesta)
        })
    .catch(error => next(error))
}
});

router.post("/", async (req, res, next) => {
    try {
        const { name, height, weight, life_span, image, createdInDb} = req.body;
        const newDog = await Dog.create({ 
            name, 
            height, 
            weight, 
            life_span, 
            image, 
            createdInDb
        })
        res.status(201).send(newDog)
    } catch (error) {
        next(error)
    }
})

router.post("/:dogId/temperament/:temperamentId", async (req, res, next) => {  //cuando haga un get me va a traer los dogs que yo le haya agregado ese temperamento en particular (xque en findAll usé include : temperament)
    try {
        const { dogId, temperamentId} = req.params;
        const dog = await Dog.findByPk(dogId)     //await espera una promesa cuando usamos async await
        await dog.addTemperament(temperamentId)  //es un mixing de sequelize (add + el nombre de tu tabla con la 1ra. letra en mayúsc.)
        res.send(200)
    } catch(error) {
        next(error)
    }
})

router.delete("/", (req, res, next) => {
    res.send("soy delete /dogs")
})

module.exports = router;

*/