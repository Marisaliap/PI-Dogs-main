import React from "react";
import styles from "../styles/Card.module.css";


export default function Card({ name, image, temperament, weight}) {
    return (
        <div> 
            <div className={styles.box}>
            <div>
            <h2 className={styles.breed}>{name}</h2>
            <img className={styles.image} src={image} alt= "Image not found" width= "200px" height="250px" />
            </div>
            <div className={styles.overlay}>
            <div className={styles.text}>
            <h2 className={styles.temps}>
            <h5> {temperament} </h5>
            </h2>
            <h2 className={styles.weight}> {weight}  (Kg) </h2>
            </div>
            </div>
            </div>
        </div>
    );
}