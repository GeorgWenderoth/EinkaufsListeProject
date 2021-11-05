import axios from 'axios';
import React, { useState } from "react";
import {Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export function ListElement(props) {
    const [amount, setAmount] = useState(props.a.amount);
    //setAmount(props.a.amount);

   /* useEffect(() => {

    }) */

   const handleNumber = (e) =>{
        setAmount( e.target.value);
        console.log("nummber: " +e  + "id: " + props.a.itId);
        //e.preventDefault();
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8081/einkaufsListeAnzahlAendern',
            data: {
                "itId": props.a.itId,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false,
                "amount": e.target.value,
            },

        })
    }

   const handleButton = (e) =>{
        console.log("löschid: " +props.a.itId);
        e.preventDefault();
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:8081/einkaufsListeElementLoeschen',
            data: {
                "itId": props.a.itId,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false,
                "amount": 1
            },
        })
    }

   const handleDurchstreichen =(a)=>{
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8081/einkaufsListeDurchgestrichen',
            data: {
                "itId": a,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false,
                "amount": 1

            },
        })

    }

    return(
        <div  key={props.a.itId.toString()}>
            <button><FontAwesomeIcon className="form-icon" icon={faPen}/></button>
            {props.a.einkaufsPunkt}

            <input type="number" value={amount} onChange={(e) => handleNumber(e)}/>
            <button id="e" onClick={(e) => handleButton(e)}>Loeschen</button>
            <input type="checkbox" checked={props.a.strich}  onChange={(e) => handleDurchstreichen(props.a.itId)}  /></div>

    )
}