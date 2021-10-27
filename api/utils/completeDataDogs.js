const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
require('dotenv').config();
const{ API_KEY } = process.env 

// En este archivo auxiliar guardo toda la info para usarla después en las rutas.
//Recibo info de la api - si llego a modularizar voy a usarlo (por ahora no -:)

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


module.exports={
    getApiInfo,
    getDbInfo,
    getAllDogs
};