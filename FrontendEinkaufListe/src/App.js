/*import React, { useState } from "react";
import "./App.css"
import { v4 as uuidv4 } from "uuid";
import Item from "./Item";

function App() {
  const [item, setItem] = useState(""); // was mache ich hier
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {  // was macht e (eingabe?)
    const newItem = {
      id: uuidv4(), //generiert neine unice id
      item: item,
      complete: false,
    };
    e.preventDefault();
    if (item) {
      setList([...list, newItem]);
      setItem("");
    }
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
      <div className="App">
        <h1>Grocery List</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={item} onChange={handleChange} />
          <button type="submit">ADD</button>
        </form>
      </div>
  );
}

export default App;
*/

import axios from 'axios';
import React, { useState } from "react";

import "./App.scss";

import {Col, Container, Row, Card, Modal} from "react-bootstrap";
import "./Styles.scss";

import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import {ListElement} from "./listElement";


let ob = {}; //ist leer, render holt es sich bevor es  gefuellt ist und dato vorhanden ist
class App extends React.Component{ // es mit klasse versuchen

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
       // this.handleButton = this.handleButton.bind(this);

        //this.handlePunktChange = this.handlePunktChange.bind(this);
    }

    componentDidMount() { //?
        this.back();
        this.backEr();
        console.log(this.state.punkt, this.state.punktErledigt);
    }



    back () {
        const promise = axios.get( 'http://127.0.0.1:8081/einkaufsListeElementeNotDone'  /*'http://127.0.0.1:8081/einkaufsListeElemente' */)
        const daten = promise.then( wert => this.setState({punkt: wert.data})) //was mache ich hier genau // wert => ob.dato = wert.data
        // const daten = promise.data;
        console.log(this.state.punkt);
    }

    backEr () {
        const promise = axios.get( 'http://127.0.0.1:8081/einkaufsListeElementeDone'  /*'http://127.0.0.1:8081/einkaufsListeElemente' */)
        const daten = promise.then( wert => this.setState({punktErledigt: wert.data})) //was mache ich hier genau // wert => ob.dato = wert.data
        // const daten = promise.data;
        console.log(this.state.punktErledigt);
    }


  /*  handlePunktChange(event){
        this.setState({punkt: ob.dato});
        console.log(this.state.punkt);
    } */




     handleChange(event){
       this.setState({value: event.target.value}) //warum geschweifte klammern
         console.log(this.state.value);
     }

   handleSubmit = (event) => {
      // event.preventDefault(); //event.preventDefault bei Submit behebt den fehler, eite wird nicht mehr selbstständig geladen
       const s = this.state.value.split(/(\d+)/);
       let anzahl = s[s.length - 2];
       console.log("split: " + anzahl);
       console.log("ar: " + s);
       if (anzahl !== undefined) {
           s.length = s.length - 2;
       } else {
           anzahl = 1;
       }

       console.log("sL: " + s.length + "s: " +s);
        const p = s.toString();

   console.log("target: " + event.target[0].value);
       axios({
      method: 'post',
      url: 'http://127.0.0.1:8081/einkaufsListe',
      data: {
        "itId": 100,
        "einkaufsPunkt": p,
        "strich": false,
        "amount": anzahl,
      },
    })
  };

    handleNumber(a,e){
        this.setState({amount: e.target.value});
        console.log("nummber: " +e.target.value);
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

    handleButton(a,e){
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

    handleDurchstreichen(a){
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



    handleModal(){
       // if(this.state.showM){

      //  } else {
            this.setState({showM: true});
      //  }

    }

    closeModal(){
        this.setState({showM: false});
    }

    uebergabeMethode(id, title, harken, anzahl, notizen ){
        console.log("parameter: " + id +" " +title + " " + anzahl + " " +notizen)
            console.log("punkt " + this.state.punkt[0]);
        let punkt = [...this.state.punkt];
         let i = punkt.map(a=> a.itId).indexOf(id);
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
            console.log("punktTest: " + id + " " + this.state.punkt[i].itId, this.state.punkt[i].einkaufsPunkt,this.state.punkt[i].notizen);
    }


  handleDeleate (e){

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
    }

   // handleClose()

    render() {

        return (
            <div className="App">
                <div className="header">
                    <h1 className="ueberschrift">Grocery List</h1>
                    <form className="addButton" onSubmit={this.handleSubmit}>
                        <input type="text" id="inp" value={this.state.value} onChange={this.handleChange}/>
                        <input type="submit" value="Button"/>
                    </form>
                </div>
                <Container className="container">
                    <div className="reihe d-flex justify-content-center" >
                        <div >
                        { this.state.punkt.map((a) =>  <ListElement a={a} id={a.itId} b={(id, title, harken, anzahl, notizen)=>this.uebergabeMethode(id, title, harken, anzahl, notizen)}/>  )}
                 </div> </div>
                </Container>
                <div>
                    <p>
                        Trennlinie
                    </p>
                </div>
                <Container className="container" >
                    <Row className="reihe">{ this.state.punktErledigt.map((a) =>  <Col   ><ListElement a={a} id={a.itId} />
                    </Col> )}</Row>
                </Container>
                <button onClick={this.handleDeleate}>abgeharkte elemente Löschen</button>
            </div>
        )
    }

}

export default App;

/* <li key={a.itId.toString()}>{a.einkaufsPunkt}
                <input type="number" value={this.state.amount} onChange={(e) => this.handleNumber(a.itId,e)}/>
                <button id="e" onClick={(e) => this.handleButton(a.itId,e)}>Loeschen</button>
                <input type="checkbox" checked={a.strich}  onChange={(e) => this.handleDurchstreichen(a.itId)}  /></li> )}
*/

/*<div className="grid">{ this.state.punkt.map((a) => <ListElement a={a} id={a.itId} />
                    )}
                </div>

 */