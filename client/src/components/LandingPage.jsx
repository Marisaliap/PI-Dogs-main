import React from "react";
import { NavLink } from 'react-router-dom'; 
import styles from "../styles/LandingPage.module.css";

export default function LandingPage() {
    return (
      <div className={styles.landingpage}>
          <div className={styles.bkg}>
         <div className={styles.containerAll}>
         <div className={styles.container}>
            <h1  className={styles.title}>The Dog Api</h1>
            <div className={styles.buttonPosition}>
            <NavLink to ="/home">
                <button className={styles.button}>Lets Go In!</button>
            </NavLink>
            </div>
            </div>
            </div>
        </div>
        </div> 
    )
} 