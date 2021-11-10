import React from "react";
import styles from "../styles/Card.module.css"; 
/*import styles from "../styles/CardBackup.module.css";*/


export default function Card({ name, image, temperament, weight}) {
    return (
        <div> 
            <div className={styles.box}>
            <div>
            <p className={styles.breed}>{name}</p>
            <img className={styles.image} src={image} alt= "Image not found" width= "240px" height="180px" />
            </div>
            <div /* className={styles.overlay} */>
            <div className={styles.text}>
            <p className={styles.temps}> {temperament} </p>
            <p className={styles.weight}> {weight}  (Kg) </p>
            </div>
            </div>
            </div>
        </div>
    );
}