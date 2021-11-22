import axios from 'axios';
import React, {useState} from "react";

import "./App.scss";

import {Col, Container, Row, Card, Modal, Button} from "react-bootstrap";
import "./Styles.scss";
import {ListElement} from "./listElement";

let ob = {}; //ist leer, render holt es sich bevor es  gefuellt ist und dato vorhanden ist
class App extends React.Component { // es mit klasse versuchen

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            punkt: [],
            punktErledigt: [],
            amount: '',
            showM: false,
            punktTest: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() { //?
        this.back();
        this.backEr();
        console.log(this.state.punkt, this.state.punktErledigt);
    }

    back() {
        const promise = axios.get('http://127.0.0.1:8081/einkaufsListeElementeNotDone'  /*'http://127.0.0.1:8081/einkaufsListeElemente' */)
        const daten = promise.then(wert => this.setState({punkt: wert.data})) //was mache ich hier genau // wert => ob.dato = wert.data
    }

    backEr() {
        const promise = axios.get('http://127.0.0.1:8081/einkaufsListeElementeDone'  /*'http://127.0.0.1:8081/einkaufsListeElemente' */)
        const daten = promise.then(wert => this.setState({punktErledigt: wert.data})) //was mache ich hier genau // wert => ob.dato = wert.data
    }


    handleChange(event) {
        this.setState({value: event.target.value}) //warum geschweifte klammern
        console.log(this.state.value);
    }

    handleSubmit = (event) => {
        // event.preventDefault(); //event.preventDefault bei Submit behebt den fehler, eite wird nicht mehr selbstständig geladen
        if (this.state.value !== "") {
            let trim = this.state.value.trim();
            console.log("target:" + event.target[0].value + ":");
            const split = trim.split(/(\d+)/);
            console.log("länge Splitt: " + split.length + ", letztes element:" + split[split.length - 1] + ":");
            console.log("gespliteter String:" + split + ":");
            let anzahl;
            if (split[split.length - 1] === "") {
                anzahl = split[split.length - 2];
                split.length = split.length - 2;

            } else {
                anzahl = 1;
            }
            console.log("anzahl: " + anzahl);
            if (split[0] === "") {

                let a = split.shift();
                console.log("index 0 Soll removed werden:" + a + ": " + split);
            }
            console.log("länge ohne amount: " + split.length + " ohne amount:" + split + ":");
            let einkaufsPunkt = split.toString();
            einkaufsPunkt = einkaufsPunkt.replace(/,/g, '');
            console.log("p: " + einkaufsPunkt);
            let cPunkt = {
                "itId": 100,
                "einkaufsPunkt": einkaufsPunkt,
                "strich": false,
                "amount": anzahl,
            }
            let punkt = this.state.punkt;
            punkt.push(cPunkt);
            this.setState({punkt});

            axios({
                method: 'post',
                url: 'http://127.0.0.1:8081/einkaufsListe',
                data: {
                    "itId": 100,
                    "einkaufsPunkt": einkaufsPunkt,
                    "strich": false,
                    "amount": anzahl,
                },
            })
        }
    }

    handleNumber(a, e) {
        this.setState({amount: e.target.value});
        console.log("nummber: " + e.target.value);
        e.preventDefault();
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8081/einkaufsListeAnzahlAendern',
            data: {
                "itId": a,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false,
                "amount": e.target.value
            },
        })
    }

    handleButton(a, e) {
        console.log(a);
        e.preventDefault();
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:8081/einkaufsListeElementLoeschen',
            data: {
                "itId": a,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false
            },
        })
    }

    handleDurchstreichen(a) {
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8081/einkaufsListeDurchgestrichen',
            data: {
                "itId": a,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false
            },
        })
    }

    uebergabeMethode(id, title, harken, anzahl, notizen) {
        console.log("parameter: " + id + " " + title + " " + anzahl + " " + notizen)
        console.log("punkt " + this.state.punkt[0]);
        let punkt = [...this.state.punkt];
        let i = punkt.map(a => a.itId).indexOf(id);
        console.log("i: " + i);
        let cPunkt = {...punkt[id]};
        cPunkt = {
            "itId": id,
            "einkaufsPunkt": title,
            "strich": harken,
            "amount": anzahl,
            "notizen": notizen
        }
        punkt[i] = cPunkt;
        this.setState({punkt});
        console.log("punktTest: " + id + " " + this.state.punkt[i].itId, this.state.punkt[i].einkaufsPunkt, this.state.punkt[i].notizen);
    }

    handleDeleate(e) {

        e.preventDefault();
        axios({
            method: 'delete',
            url: 'http://127.0.0.1:8081/einkaufssListeElementeDoneLoeschen',
            data: {
                "itId": 3,
                "einkaufsPunkt": "platzhalterdatenloeschen",
                "strich": false
            },
        })
        window.location.reload(false);
    }

    render() {
        return (
            <div className="App">
                <div className="header">
                    <h1 className="ueberschrift">Digitale Einkaufsliste</h1>
                    <form className="row g-3 justify-content-center"/*className="addButton"*/
                          onSubmit={this.handleSubmit}>
                        <div className="col-auto">
                            <input className="form-control" type="text" id="inp" placeholder="Einkaufspunkt"
                                   value={this.state.value} onChange={this.handleChange}/>
                        </div>
                        <div className="col-auto">
                            <Button type="submit" className="btn-secondary">Hinzufügen</Button>
                        </div>
                    </form>
                </div>
                <div className="d-flex justify-content-center">
                    <p className="schrift">
                        Zu erledigende Einkäufe
                    </p>
                </div>

                <Container className="container">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-wrap  justify-content-center reihe">
                            {this.state.punkt.map((a) => <ListElement a={a} id={a.itId}
                                                                      b={(id, title, harken, anzahl, notizen) => this.uebergabeMethode(id, title, harken, anzahl, notizen)}/>)}
                        </div>
                    </div>
                </Container>
                <div className="d-flex justify-content-center">
                    <p className="schrift mt-4">
                        Erledigte Einkäufe
                    </p>
                </div>
                <Container className="container">
                    <div className="d-flex justify-content-center">
                        <div
                            className="d-flex flex-wrap  justify-content-center reihe">{this.state.punktErledigt.map((a) =>
                            <ListElement a={a} id={a.itId}/>
                        )}</div>
                    </div>
                </Container>
                <div className="d-flex flex-row justify-content-center  ">
                    <Button className=" btn-secondary btn-sm mt-4 mb-4" onClick={this.handleDeleate}>Erledigte Einkäufe
                        löschen</Button>
                </div>
            </div>
        )
    }
}

export default App;