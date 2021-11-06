import React from "react";
import { useEffect }  from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dogDetail } from "../actions";
import styles from "../styles/Detail.module.css";



export default function Detail (props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dogDetail(props.match.params.id))      //accedo al id pasandole props a mi componente Detail
    }, [dispatch, props.match.params.id])
    
    const myDog = useSelector((state) => state.detail)

return (
    <div className={styles.bkg}> 
     <div className={styles.container}>
        { 
        myDog.length > 0 ?
        <div className={styles.detailContainer}> 
         <h1 className={styles.title}>{myDog[0].name} </h1>  
         <img className={styles.image} src = {myDog[0].image} alt="Img not found"  />  
         <p className={styles.text}> Temperaments: {!myDog[0].createdInDb? myDog[0].temperament + " " : myDog[0].temperaments.map(el => el.name + (" "))}</p>  
         <p className={styles.text}> Height: {myDog[0].height} Cm</p> 
         <p className={styles.text}> Weight: {myDog[0].weight} Kg </p> 
         <p className={styles.text}> Life span: {myDog[0].createdDb? myDog[0].life_span + "years" : myDog[0].life_span}  </p>
        </div> : <p className={styles.text}> Loading...</p>                                                          
    }
     </div>
     <div className={styles.back}>
                           <Link to="/home"><button className={styles.backbutton} >Back </button></Link>
                            </div>   
    </div>
)
}

//hago esto porque la img en el back viene como image
//en el back el temperamento es en plural y es un array con un objeto con la propiedad name. En cambio en la api me viene como un 
//arreglo de strings - por eso tengo que acceder de forma distinta