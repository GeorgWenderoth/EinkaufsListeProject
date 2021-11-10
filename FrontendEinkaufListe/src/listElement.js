import axios from 'axios';
import React, { useState } from "react";
import {Col, Row, Card, Button, Modal} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import "./Styles.scss";

export function ListElement(props) {
    const [amount, setAmount] = useState(props.a.amount);
    const [showM, setShowM] = useState(false);
    const [titel, setTitel] = useState(props.a.einkaufsPunkt)
    const [notes, setNotes] = useState("Notizen");
    //const [bearbeiten, setBearbeiten] = useState(true);
    //setAmount(props.a.amount);

   /* useEffect(() => {

    }) */

   const handleNumber = (e) =>{
        setAmount( e.target.value);
        console.log("nummber: " +e  + "id: " + props.a.itId);
        //e.preventDefault();
       /* axios({
            method: 'put',
            url: 'http://127.0.0.1:8081/einkaufsListeAnzahlAendern',
            data: {
                "itId": props.a.itId,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false,
                "amount": e.target.value,
            },

        }) */
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

  const handleClose = () => {
      axios({
          method: 'put',
          url: 'http://127.0.0.1:8081/einkaufsListeUpdateM',
          data: {
              "itId": props.a.itId,
              "einkaufsPunkt": titel,
              "strich": false,
              "amount": amount,
          },

      })
       setShowM(false);
  }

  // const handleClose = () => setShowM(false);
   const handleShow = () => setShowM(true);
   const handleText = (e) => setTitel(e.target.value);

    return(
<div>

        <Card  className="cardStyle" style={{ width: '300px', height: '300px',  backgroundColor: 'darkred' , border: '3px red', cursor: "pointer" }}  key={props.a.itId.toString()}>
            <div className="buttonHull">  <Button onClick={handleShow} className="bearbeitungsButton"><FontAwesomeIcon className="form-icon" icon={faPen}/></Button> </div>
            <Modal show={showM} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><input type="text" onChange={handleText} value={titel}/></Modal.Title>
                </Modal.Header>
                <Modal.Body>{notes}</Modal.Body>
                <input type="number" value={amount} onChange={(e) => handleNumber(e)}/>
            </Modal>
            <Card.Body onClick={(e) => handleDurchstreichen(props.a.itId)}>
                <div className="logoHull">
                    <p className="logo">{props.a.einkaufsPunkt[0]}</p>
                </div>

                    <div className="punktHull">
                        <p className="punkt">{props.a.einkaufsPunkt}</p> <p className="punktAmount">{props.a.amount}</p>
                    </div>
               // <button id="e" onClick={(e) => handleButton(e)}>Loeschen</button>
                <input type="checkbox"  checked={props.a.strich}  onChange={(e) => handleDurchstreichen(props.a.itId)}  />
            </Card.Body>

           </Card>
</div>



    )
}

// onClick={(e ) => handleBearbeiten(props.a.itId)}  alter bearbeitungs button stift number distplay