import React from "react";
import "./App.scss";
import {Button} from "react-bootstrap";
import {AxiosCalls} from "../utils/axiosCalls";
import {EinkaufHeader} from "./header/einkaufHeader";
import {BereichUeberschrift} from "./ueberschrift/bereichUeberschrift";
import {ContainerListe} from "./liste/containerListe";

//require('dotenv').config()


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            punkt: [],
            punktErledigt: [],
            amount: '',
            showM: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteAllDoneItems = this.deleteAllDoneItems.bind(this);
    }

    componentDidMount() {
        console.log("start");
        this.back();
        this.backEr();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Upadate: ", this.state.punktErledigt);
    }

    /**
     * Holt sich die Unerledigten Items vom Backend und setzt sie in state
     */
    back() {
        const promise = AxiosCalls('get', '/einkaufsListeElementeNotDone', "NotDone");
        promise.then(wert => {
            console.log("back ", wert.data);
            this.setState({punkt: wert.data})
        })
    }

    /**
     * Holt sich die Erledigten items vom Backend und setzt sie in state
     */
    backEr() {
        const promise = AxiosCalls('get', '/einkaufsListeElementeDone', "Done");
        promise.then(wert => this.setState({punktErledigt: wert.data}))
    }


    /**
     * Man die eingabe konform, überprüft ob eine anzhal gegeben ist, speichert im state und backend
     * @param value
     */
    handleSubmit = (value) => {
        if (value !== "") {
            const trim = value.trim();
            const split = trim.split(/(\d+)/);
            let anzahl;
            if (split[split.length - 1] === "") {
                anzahl = split[split.length - 2];
                split.length = split.length - 2;
            } else {
                anzahl = 1;
            }
            let einkaufsPunkt = split.toString();
            einkaufsPunkt = einkaufsPunkt.replace(/,/g, '');
            console.log("p: " + einkaufsPunkt);
            let cPunkt = {
                "itId": 100,
                "einkaufsPunkt": einkaufsPunkt,
                "strich": false,
                "amount": anzahl,
            }

            const promise = AxiosCalls('post', '/einkaufsListe', cPunkt);
            promise.then(item => {
                console.log("App: Post .then:", item.data);
                let punkt = [...this.state.punkt];
                punkt.push(item.data);
                this.setState({punkt: punkt});
            });
        }
    }


    /**
     * Von child to parent component, Wird im Child  listElement aufgerufen und mit de übergeben werte wird im state in ein orbjekt geupadtet
     * @param {number} id - id des obekts fürs backend
     * @param {string} title - einkaufsPunkt (name des Artikels)
     * @param  harken - sind die einkaufsPunkte erledigt oder nicht
     * @param {number} anzahl - die anzahl wie of ein arteikel gekauft werden soll
     * @param {string} notizen - Notizen / bemerkungen zum artikel
     */
    updatePunktInState(id, title, harken, anzahl, notizen) {
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

    /**
     * Updated den state wenn ein Item verschoben wird von unerledigt zu erledigt und andersherum
     * @param id
     * @param harken
     */
    updatePunktStrichDoneOrNot(id, harken) {
        console.log("harken: " + harken);// strichw wert muss noch geändert werden.
        let punkt = [...this.state.punkt];
        let indexItem = punkt.map(a => a.itId).indexOf(id);
        let punktErledigt = [...this.state.punktErledigt];
        let indexItemErledigt = punktErledigt.map(a => a.itId).indexOf(id);
        let speicher;
        if (harken) {
            speicher = punktErledigt[indexItemErledigt];
            speicher.strich = false;
            punktErledigt.splice(indexItemErledigt, 1);
            punkt.push(speicher)
        } else {
            speicher = punkt[indexItem];
            speicher.strich = true;
            punkt.splice(indexItem, 1);
            punktErledigt.push(speicher);
        }
        this.setState({punkt: punkt, punktErledigt: punktErledigt});
    }

    /**
     *  Löscht alle erledigten Artikel /einkaufsPunkte
     */
    deleteAllDoneItems() {



       AxiosCalls('delete', '/einkaufssListeElementeDoneLoeschen');
        this.setState({punktErledigt: []});
    }

    render() {
        return (
            <div className="App">
                <EinkaufHeader handleSubmit={(value) => this.handleSubmit(value)}/>
                <BereichUeberschrift ueberschrift={"Zu erledigende Einkäufe"}/>
                <ContainerListe itemList={this.state.punkt}
                                updatePunkt={(id, title, harken, anzahl, notizen) => this.updatePunktInState(id, title, harken, anzahl, notizen)}
                                updateDoneOrNot={(id, harken) => this.updatePunktStrichDoneOrNot(id, harken)}/>
                <BereichUeberschrift ueberschrift={"Erledigte Einkäufe"}/>
                <ContainerListe itemList={this.state.punktErledigt}
                                updatePunkt={(id, title, harken, anzahl, notizen) => this.updatePunktInState(id, title, harken, anzahl, notizen)}
                                updateDoneOrNot={(id, harken) => this.updatePunktStrichDoneOrNot(id, harken)}/>
                <div className="d-flex flex-row justify-content-center  ">
                    <Button className=" btn-secondary btn-sm mt-4 mb-4" onClick={this.deleteAllDoneItems}>Erledigte
                        Einkäufe
                        löschen</Button>
                </div>
            </div>
        )
    }
}

export default App;


/*
<div className="header">
                    <h1 className="ueberschrift">Digitale Einkaufsliste</h1>
                    <form className="row g-3 justify-content-center"
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



                <div className="d-flex justify-content-center">
                    <p className="schrift mt-4">
                        Erledigte Einkäufe
                    </p>
                </div>



                <Container className="container">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-wrap  justify-content-center reihe">
                            {this.state.punkt.map((item) => <ListElement item={item} id={item.itId}
                                                                      updatePunkt={(id, title, harken, anzahl, notizen) => this.updatePunktInState(id, title, harken, anzahl, notizen)}
                                                                      updateDoneOrNot={(id, harken) =>this.updatePunktStrichDoneOrNot(id,harken)}   />)}
                        </div>
                    </div>
                </Container>


                <Container className="container">
                    <div className="d-flex justify-content-center">
                        <div
                            className="d-flex flex-wrap  justify-content-center reihe">{this.state.punktErledigt.map((item) =>
                            <ListElement item={item} id={item.itId}
                                         updateDoneOrNot={(id, harken) =>this.updatePunktStrichDoneOrNot(id,harken)}  />
                        )}</div>
                    </div>
                </Container>
 */