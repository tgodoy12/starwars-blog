import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
  
    if (!values.name) {
      errors.name = 'Required';
    }
  
    return errors;
};

const Addform = (props) => {
    const {actions} = useContext(Context);
    //declaro initialValues donde se agregan los fields a traves de los props
    //que paso en la page add.jsx
    const initialValues = {};
    props.fields.forEach(field => {
        initialValues[field] = '';
    });

    //en useFormik paso el objeto initialValues declarado antes a la propiedad initialValues
    //lo demas lo dejo igual
    const formik = useFormik({
        initialValues: initialValues,
        validate,
        onSubmit: async (values) => {
            console.log("Form values:", values);
            await actions.postVehicle(
                values.name,
                values.model,
                values.manufacturer,
                values.cost_in_credits,
                values.length,
                values.max_atmosphering_speed,
                values.crew,
                values.passengers,
                values.cargo_capacity,
                values.consumables,
                values.vehicle_class
            );
        },
    });

    return(
        <div className="d-flex justify-content-center">
            <div className="add-form w-50">
                <form onSubmit={formik.handleSubmit}>
                    {/* hago un map de los fields para generar los inputs necesarios */}
                    {props.fields.map((field, index) => (
                        <div className="mb-3" key={index}>
                        <label htmlFor={field} className="form-label">{field}</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id={field}
                        name={field}
                        onChange={formik.handleChange}
                        value={formik.values[field]}/>
                        
                        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

                    </div>
                    ))}
                    <button type="submit">Submit</button>

                </form>
            </div>
        </div>
        
    )
}

export default Addform;