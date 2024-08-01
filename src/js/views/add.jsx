import React from "react";
import Addform from "../component/addform.jsx";
import { useParams } from "react-router-dom";

export const Add = () => {
    //segun el parametro type (characters, planets o vehicle), se cargan los fields correspondientes
    //en el <AddForm/>
    const { type } = useParams();

    let fields = [];

    switch (type) {
        case "planets":
            fields = ["name", "rotation_period", "orbital_period", "diameter", "climate", "gravity", "terrain", "surface_water", "population"];
            break;
        case "characters":
            fields = ["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"];
            break;
        case "vehicles":
            fields = ["name", "model", "manufacturer", "cost_in_credits", "length", "max_atmosphering_speed", "crew", "passengers", 
                "cargo_capacity", "consumables", "vehicle_class"
            ];
            break;
    }
    return(
        <div className="container">
            <Addform fields={fields}/>

        </div>
    )
}