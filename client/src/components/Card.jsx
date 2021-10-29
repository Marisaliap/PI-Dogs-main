import React from "react";

export default function Card({ name, image, temperament, weight}) {
    return (
        <div> 
            <h3>{name}</h3>
            <img src={image} alt= "Image not found" width= "200px" height="250px" />
            <h5> {temperament} </h5>
            <h5> {weight} </h5>
        </div>
    );
}