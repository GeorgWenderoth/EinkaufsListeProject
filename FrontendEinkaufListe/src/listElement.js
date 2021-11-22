import axios from 'axios';
import React, {useState} from "react";
import {Col, Row, Card, Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import "./Styles.scss";
import "./App.scss";

export function ListElement(props) {
    const [amount, setAmount] = useState(props.a.amount);
    const [showM, setShowM] = useState(false);
    const [titel, setTitel] = useState(props.a.einkaufsPunkt)
    const [notes, setNotes] = useState(props.a.notizen === undefined ? 'notizen' : props.a.notizen);
    const [colour, setColour] = useState(props.a.strich ? "darkgreen" : "darkred");
    const [displayButton, setDisplayButton] = useState(props.a.strich ? "none" : "visible");
    const [displayColour, setDisplayColour] = useState(props.a.strich);

    const handleNumber = (e) => {
        setAmount(e.target.value);
        console.log("nummber: " + e + "id: " + props.a.itId);
    }

    const handleDurchstreichen = (a) => {
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

        window.location.reload(false);

    }

    const handleClose = () => {
        console.log("notizen: " + notes);
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8081/einkaufsListeUpdateM',
            data: {
                "itId": props.a.itId,
                "einkaufsPunkt": titel,
                "strich": false,
                "amount": amount,
                "notizen": notes
            },
        })

        props.b(props.a.itId, titel, false, amount, notes);
        setShowM(false);
    }

    const handleCloseWithoutSaving = () => {

        setShowM(false);
        setTitel(props.a.einkaufsPunkt);
        setNotes(props.a.notizen);
        setAmount(props.a.amount);
    }


    const handleShow = () => setShowM(true);
    const handleText = (e) => setTitel(e.target.value);
    const handleNotes = (e) => setNotes(e.target.value)

    return (

        <Card className={"cardStyle " + (displayColour ? 'cardColourGreen' : 'cardColourRed')}
              style={{border: '3px red', cursor: "pointer"}}
              key={props.a.itId.toString()}>
            <div className="buttonHull">
                <Button style={{display: displayButton}} onClick={handleShow}
                        className="bearbeitungsButton"><FontAwesomeIcon className="form-icon" icon={faPen}/></Button>
            </div>
            <Modal show={showM} onHide={handleCloseWithoutSaving}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Bearbeite Einkaufspunkt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="mb-3 row">
                            <label className="col-3 col-form-label">Einkauf: </label>
                            <div className="col-9">
                                <input className="form-control " type="text" onChange={handleText} value={titel}/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-3 col-form-label">Notizen: </label>
                            <div className="col-9">
                                <input className="form-control" type="text"
                                       placeholder="Notizen"
                                       onChange={handleNotes}
                                       value={notes}/>
                            </div>
                        </div>
                        <div className="row">
                            <label className=" col-3 col-form-label">Anzahl: </label>
                            <div className="col-9">
                                <input className="form-control" type="number" value={amount}
                                       onChange={(e) => handleNumber(e)}/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer><Button variant="secondary" size="sm"
                                      onClick={handleCloseWithoutSaving}>Abbrechen</Button>
                    <Button variant="primary" size="sm" onClick={handleClose}>Änderung Speichern</Button></Modal.Footer>

            </Modal>
            <Card.Body onClick={(e) => handleDurchstreichen(props.a.itId)}>
                <div className="logoHull">
                    <p className="logo">{props.a.einkaufsPunkt[0]}</p>
                </div>


                <div className="punktHull">
                    <p className="punkt">{props.a.einkaufsPunkt}</p> <p className="punktAmount">{props.a.amount}</p>
                </div>


            </Card.Body>

        </Card>

    )
}

