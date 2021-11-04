import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderbyName, orderbyWeight, filterDogsCreated, filterDogTemp, getTemperaments } from "../actions";
import { NavLink, Link } from "react-router-dom";
import Card from "./Card";
import Paged from "./Paged";
import styles from "../styles/Home.module.css";
import SearchBar from "./SearchBar";



export default function Home () {

const dispatch = useDispatch()                        //uso el hook useDispatch
const allDogs = useSelector((state) => state.dogs)   // este hook es lo mismo que usar el mapStateToProps. Con useSelector traeme en esa constante todo lo que esta en el estado de dogs
// me trae desde el reducer el estado dogs donde están todos los perros 

//paginado
const [currentPage, setCurrentPage] = useState(1)      //le paso el estado local con la primer página que se renderiza
const [ dogsPerPage ] = useState (8)                   //cuántos personajes quiero por página
const indexOfLastDog = currentPage * dogsPerPage       //cuando empieza será 8 
const indexOffirstDog = indexOfLastDog - dogsPerPage   // 0
const currentDogs = allDogs.slice(indexOffirstDog, indexOfLastDog)     //slice toma una porción del arreglo dependiendo lo que le estoy pasando por parámetro

const pagedTotal = (pageNumber) => {                      
    setCurrentPage(pageNumber)                        //acá el paginado va a setear la pagina en el numero de pagina que se vaya clickeando
}                                                     //cuando setea la página los índices cambian y el slide se va modificando

const allTemp = useSelector((state) => state.temperaments)

const [order, setOrder] = useState(""); // esto es solo un estado local para que me renderize el ordenamiento A-Z
const [orderr, setOrderr] = useState(""); // esto es solo un estado local para que me renderize el ordenamiento por peso

useEffect (()=> {
    dispatch(getDogs());                              //este dispatch es lo mismo que hacer el mapDispatchToProps
},[dispatch])

useEffect(()=>{
    dispatch(getTemperaments())
},[]);

function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());                                  //esto me lo resetea la pagina para que no se buguee
}

function handleFilterCreated(e) {                        //declaro una función que es un handle del filter del dog creado o de api
    e.preventDefault();                              //esta funcion es la que paso en el select y cuando (e) se modifique ejecuta esta función
    dispatch(filterDogsCreated(e.target.value));     //despacho la acción llamada filterDogsCreated y accedo al valor de cada una de las opciones
}                                                    //de value con el e.target.value - dependiendo de cuál clickea el usuario

function handleFilterByTemp(e){
  e.preventDefault();
  dispatch(filterDogTemp(e.target.value));
}

function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderbyName(e.target.value));
    setCurrentPage(1);                                //cuando hago el ordenamiento quiero setear la pagina en la primera, en 1
    setOrder(`Ordenado ${e.target.value}`);           //pero tambien tengo que tener un estado que me lo setee
}                                                     //a ese estado local modificamelo para que desde el front me haga el ordenamiento

function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderbyWeight(e.target.value));
    setCurrentPage(1);
    setOrderr(`Ordenado ${e.target.value}`);
}

return (
    <div className={styles.home}> 
    <div className={styles.searchContainer}>
    <div className={styles.search}>
         <SearchBar /> 
         </div>
         <div className={styles.create}>
        <Link to= "/dog">Create a New Dog</Link>
        </div>
    </div>
    <div className={styles.title}>
        <h1> Find your Favorite Dog! </h1>
        </div>
     <div className={styles.filterContainer}> 
            <div className={styles.ordername}>
            <h5>Order by Name:</h5>
            <select onClick={(e) => handleOrderByName(e)}>
              <option value="Asc">From A to Z</option>
              <option value="Desc">From Z to A</option>
            </select>
          </div>
          <div className={styles.orderweight}>
            <h5>Order by weight:</h5>
            <select onClick={(e) => handleOrderByWeight(e)}>
              <option value="Weight 1">Small</option>
              <option value="Weight 2">Big</option>
            </select>
            </div>
            <div>
          <select className={styles.temps} onClick={(e) => handleFilterByTemp(e)}>
            <option value="">Filter by Temperament</option>
            {allTemp.map((temp) => (
              <option key={temp.id} value={temp.name}>{temp.name}</option>
            ))}
          </select>
          </div>
          <div>
        <select onClick={(e) => handleFilterCreated(e)} className={styles.selectD}>
          <option value="All">All</option>
          <option value="Created">Created</option>
        </select>
        </div>
          <div>
            <button className={styles.reload} onClick={(e) => handleClick(e)}> 
            Refresh
        </button>
            </div>
        </div>

      <div className={styles.direction}>
        { currentDogs?.map( el => {            //necesito tomar en el map solo los dogs que me devuelve el paginado
                return (
                    <div className={styles.dogsContainer}>
                      <NavLink styles={{ textDecoration: "none" }} to={"/dogs/" + el.id}>
                <Card 
                name={el.name} 
                image={el.image} 
                temperament={
                    el.temperament
                    ? el.temperament
                    : el.temperaments && el.temperaments.map((temp) => temp.name.concat(" "))
                }
                key={el.id}
                weight={el.weight}
                />
                </NavLink>
            </div>
          );
            })
        }
        </div>
        <div className={styles.paged}>
        <Paged
          dogsPerPage= { dogsPerPage }
          allDogs= { allDogs.length }                     //renderizo allDogs.length porque necesito un valor numérico
          pagedTotal= { pagedTotal }
        />
      </div>
      <div className={styles.back}>
        <Link to="/"><button className={styles.backbutton} >Back</button></Link>
        </div>
    </div>
)
}