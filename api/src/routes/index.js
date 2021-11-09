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
        };
    });


    router.get("/temperament", async (req, res) => {   //revisar la data que recibo, de esta forma parece darme mas elementos que de la otra forma
        const temperamentApi = (await axios.get(
            `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
        )).data
        let temperaments = temperamentApi.map((ob) => ob.temperament);
        temperaments = temperaments.join().split(",");
        temperaments = temperaments.filter (ob => ob)
        temperaments = [...new Set (temperaments)].sort();
         console.log(temperaments)
        temperaments.forEach((ob) => {
          Temperament.findOrCreate({
            where: { name: ob },
          });
        });
        const allTemperaments = await Temperament.findAll();
        res.send(allTemperaments);
      });
 

router.get("/dogs/:id", async function(req, res, next) {
    try {
        const id = req.params.id;
        const dogTotal = await getAllDogs();   
        if (id){
        let dogId = await dogTotal.filter(el => el.id == id) //dentro de todos los dogs filtra el id que te estoy pasando 
        dogId.length?                                        //si no encuentra nada entra en la res.status
        res.status(200).send(dogId) :
        res.status(404).send({ info: "Dog not found" })
        }
    } catch (error) {
        next(error)
    };
});

router.post("/dog", async (req, res, next) => {
    try {
        const { name, height, weight, life_span, image, createdInDb, temperament} = req.body;
        const newDog = await Dog.create({ 
            name, 
            height, 
            weight, 
            life_span, 
            image, 
            createdInDb
        })
        let temperamentDb = await Temperament.findAll({  //dentro de mi modelo encontrá todos los temps que coincidan con lo que le paso por body
            where: { name : temperament}    //name es igual al temperament que le llega por body
        })
        newDog.addTemperament(temperamentDb)  //al dog creado agregále el temperamento encontrado en la Bd que le llegó por body
        res.status(201).send({ info: "Dog created successfully!" })
    } catch (error) {
        next(error)
    };
});
 

router.post("/dog/:dogId/temperament/:temperamentId", async (req, res, next) => {  //cuando haga un get me va a traer los dogs que yo le haya agregado ese temperamento en particular (xque en findAll usé include : temperament)
    try {
        const { dogId, temperamentId} = req.params;
        const dog = await Dog.findByPk(dogId)     //await espera una promesa cuando usamos async await
        await dog.addTemperament(temperamentId)  //es un mixing de sequelize (add + el nombre de tu tabla con la 1ra. letra en mayúsc.)
        res.send(200)
    } catch(error) {
        next(error)
    }
})

router.delete("/dog", (req, res, next) => {
    res.send("soy delete /dogs")
})

module.exports = router;
