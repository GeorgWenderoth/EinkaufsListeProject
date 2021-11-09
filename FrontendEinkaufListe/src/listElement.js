import axios from 'axios';
import React, { useState } from "react";
import {Col, Row, Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import "./Styles.scss";

export function ListElement(props) {
    const [amount, setAmount] = useState(props.a.amount);
    //const [bearbeiten, setBearbeiten] = useState(true);
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
       console.log("card or box klicked: " + a);
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

   const handleBearbeiten =(a)=> {
       console.log("Bearbeiten: " + props.a.bearbeiten)

       axios({
           method: 'put',
           url: 'http://127.0.0.1:8081/einkaufsListeBearbeiten',
           data: {
               "itId": a,
               "einkaufsPunkt": "platzhalterdatenloeschen",
               "strich": true,
               "amount": 1,
               "bearbeiten": false

           },
       })
   }

    return(


        <Card  className="cardStyle" style={{ width: '300px', height: '300px',  backgroundColor: 'darkred' , border: '3px red', cursor: "pointer" }}  key={props.a.itId.toString()}>
            <div className="buttonHull">  <Button onClick={(e ) => handleBearbeiten(props.a.itId)} className="bearbeitungsButton"><FontAwesomeIcon className="form-icon" icon={faPen}/></Button> </div>

            <Card.Body onClick={(e) => handleDurchstreichen(props.a.itId)}>
                <div className="logoHull">
                    <p className="logo">{props.a.einkaufsPunkt[0]}</p></div>

                <Card.Title className="text-middle">
                    {props.a.einkaufsPunkt}
                </Card.Title>
                <input style={{display:  props.a.bearbeiten ? "visible" : "none"  }} type="number" value={amount} onChange={(e) => handleNumber(e)}/>
                <button id="e" onClick={(e) => handleButton(e)}>Loeschen</button>
                <input type="checkbox"  checked={props.a.strich}  onChange={(e) => handleDurchstreichen(props.a.itId)}  />
            </Card.Body>

           </Card>

    )
}