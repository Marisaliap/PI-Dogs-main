import React from "react";


export default function Paged ({ dogsPerPage, allDogs, pagedTotal}) {
    const pageNumber = []; 
    const paginado = Math.ceil(allDogs/dogsPerPage);                //el numero redondo que resulta de dividir todos los dogs x la cant de dogs x página

    for (let i = 1; i <= paginado; i++) {
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul>                                                     
                {pageNumber?.map(num =>(                            //si tengo ese arreglo, mapeálo y devolveme cada número que te devuelva el paginado    
                    <li key={num}>
                        <a onClick={()=> pagedTotal(num)}>{num}</a>  
                    </li>
                ))}         
            </ul>                                                
        </nav>
    )                                                          //num es cada una de las páginas que necesito para renderizar todos mis dogs
}

