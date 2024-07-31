import React from "react";
import Addform from "../component/addform.jsx";

export const Add = () => {
    return(
        <div className="container">

            



            <Addform fields={["name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender"]}/>

        </div>
    )
}