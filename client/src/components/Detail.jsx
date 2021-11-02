import React from "react";
import { useEffect }  from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../actions";
import style from "../styles/Detail.module.css";



export default function Detail (props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dogDetail(props.match.params.id))      //accedo al id pasandole props a mi componente Detail
    }, [dispatch, props.match.params.id])
    
    const myDog = useSelector((state) => state.detail)

return (
    <div> 
        { 
        myDog.length > 0 ?
        <div> 
         <h1> Name: {myDog[0].name} </h1>  
         <img src = {myDog[0].image} alt="Img not found"  />  
         <h4> Temperaments: {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + (" "))}</h4>  
         <p> Height: {myDog[0].height} Cm</p> 
         <p> Weight: {myDog[0].weight} Kg </p> 
         <p> Life span: {myDog[0].createdDb? myDog[0].life_span` + "years" `: myDog[0].life_span}  </p>  
        </div> : <p> Loading...</p>                                                          
    }
     <Link to="/home"><button className={style.back} >Back</button></Link>
    </div>
)
}

//hago esto porque la img en el back viene como image
//en el back el temperamento es en plural y es un array con un objeto con la propiedad name. En cambio en la api me viene como un 
//arreglo de strings - por eso tengo que acceder de forma distinta