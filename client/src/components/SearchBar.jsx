import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../actions";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e) {
        e.preventDefault();      
        setName(e.target.value)   
        console.log(name) 
    }

    function handleSubmit(e) {
        e.preventDefault();   
        dispatch(getDogsByName(name));
        setName("")                //para que cuando ya hizo la busqueda no me siga mostrando el nombre ingresado, seteo el nombre en comillas
    }

    return (
        <div className={styles.SearchBar}>
            <input className={styles.input} type="text" value={name} placeholder="Looking for a breed dog?" onChange={(e) => handleInput(e)} />
            <button className={styles.button} type="submit" onClick={(e) => handleSubmit(e)} > Search</button>
        </div>
    )
}


