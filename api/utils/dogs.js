const { Router } = require('express');
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const router = Router();
require('dotenv').config();
const{ API_KEY } = process.env 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const dogApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let apiInfo = await dogApi.data.map((dog) => {  //.data porque viene de axios - saco los valores que no quiero enviar
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric, //en sistema métrico (tambien viene imperial)
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image.url,
            temperament: dog.temperament
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}



router.get("/dogs", async (req, res, next) => {  
    try {
        const name = req.query.name
        let dogsTotal = await getAllDogs();
        if (name) {
            let dogName = await dogsTotal.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length ?
            res.status(200).send(dogName)  :
            res.status(404).send({ info: "Sorry, the dog you are looking for is not available." });
        } else {
            res.status(200).send(dogsTotal)
        } 
    } catch (error) {
        next(error)
        }
    })

/* router.get('/:id', async function(req, res) {
    const { id } = req.params;
    if (id.length === 3){
    const dog = await Dog.findByPk(id, {
        include: Temperament
        })
        res.json(dog);
    } else {
        return res.send("No existe el perro")
    }
}); */


/* en la api si buscas en la ruta donde seria por id , te trae solo una raza con su informacion, y 
en la ruta del detalle (cuando alguien haga click en una card de alguna raza) deberias buscar en la 
api si el id de esa raza es de la api , entonces haces un get a la ruta para que te devuelva la 
informacion de esa raza en especifico , y si es de tu base de datos , deberias buscar en tu base de datos, 
por id y mostrarle toda la informacion de esa raza */

/* const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get("/:id", async (req, res, next) => { 
    try {
        const id = req.params.id;
        const DogsTotal = await getAllDogs();
        if (id) {
            let dogId = await DogsTotal.filter((el) => el.id == id);
            dogId.length
            ? res.status(200).send(dogId)
            : res.status(404).send({ info: "The dog you are looking for is not available." });
        }
    } catch(error) {
        next(error)
    }
}) 
 */


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
