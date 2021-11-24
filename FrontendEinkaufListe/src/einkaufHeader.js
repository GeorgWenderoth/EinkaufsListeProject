import {Button} from "react-bootstrap";
import React, {useState} from "react";


export function EinkaufHeader(props){
    const [value,setValue] = useState();

    const handleSubmitHeader=(event)=>{
        event.preventDefault(); //event.preventDefault  seite wird nicht mehr selbstständig geladen wegen onSubmit
        props.handleSubmit(value);
    }

   const handleChange =(event) => {
        setValue(event.target.value); //warum geschweifte klammern
        console.log(value);
    }

    return(
        <div className="header">
            <h1 className="ueberschrift">Digitale Einkaufsliste</h1>
            <form className="row g-3 justify-content-center"/*className="addButton"*/
                  onSubmit={handleSubmitHeader}>
                <div className="col-auto">
                    <input className="form-control" type="text" id="inp" placeholder="Einkaufspunkt"
                           value={value} onChange={handleChange}/>
                </div>
                <div className="col-auto">
                    <Button type="submit" className="btn-secondary">Hinzufügen</Button>
                </div>
            </form>
        </div>
    )
}