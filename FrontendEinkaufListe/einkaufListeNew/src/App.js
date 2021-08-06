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
import "./App.css";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

/*const arr = () => {
  let data = localStorage.getItem("data");
  //  return daten;
  if (data) return JSON.parse(localStorage.getItem("data")); // local storage muss raus
  else return [];
}; */



/*function listenpunkt(){
    const a = this.back();
    console.log(this.back);
    const punkt = a.map((o) =>
        <li>{o}</li>);
    console.log(punkt);
    return punkt;
} */

let ob = {}; //ist leer, render holt es sich bevor es  gefuellt ist und dato vorhanden ist
class App extends React.Component{ // es mit klasse versuchen
 // const [item, setItem] = useState(""); // was passiet hier
 // const [list, setList] = useState(arr);
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            punkt: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //this.handlePunktChange = this.handlePunktChange.bind(this);
    }

    componentDidMount() {
        this.back();
    }

  //  const wertForm = null;
/*     const handleClickEvent = () => {
        const form = wertForm.current
         alert(`${form['punkt'].value}`)
         console.log(form.value);
     } */

    back () {
        const promise = axios.get('http://127.0.0.1:8081/einkaufsListeElemente')
        const daten = promise.then( wert => this.setState({punkt: wert.data})) //was mache ich hier genau // wert => ob.dato = wert.data
        // const daten = promise.data;
        console.log(this.state.punkt);


    }


  /*  handlePunktChange(event){
        this.setState({punkt: ob.dato});
        console.log(this.state.punkt);
    } */




     handleChange(event){
       this.setState({value: event.target.value}) //warum geschweifte klammern
         console.log(this.state.value);
     }

   handleSubmit = (event) =>{

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8081/einkaufsListe',
      data: {
        "itId": 100,
        "einkaufsPunkt": this.state.value,
        "strich": false
      },
    })

   /* console.log(test[1]);
    const newItem = {
      id: uuidv4(),
      item: item,
      complete: false,
    };
    console.log(newItem.id);
    e.preventDefault();
    if (item && item.length <= 25) {
      setList([...list, newItem]);
      setItem("");
    } */
  };
 /* React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list)); // in local storage gespeichert

  }, [list]); */
 /* const handleChange = (e) => {
    setItem(e.target.value);
    console.log(e.target.value);
  }; */

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

    handleDurchstreichen(a,e){
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

    render() {

        return (
            <div className="App">
                <h1>Grocery List</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="inp" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Button"/>
                </form>
                <ul>{ this.state.punkt.map((a) => <li key={a.itId.toString()}>{a.einkaufsPunkt}
                <button id="e" onClick={(e) => this.handleButton(a.itId,e)}>Loeschen</button>
                <input type="checkbox" checked={a.strich} onClick={(e) => this.handleDurchstreichen(a.itId,e)}/></li> )}

                </ul>
            </div>
        )
    }
     /*   return (
            <div className="App">
                <h1>Grocery List</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        value={item}
                        placeholder="Enter the items"
                        onChange={handleChange}
                    />
                    <button className="btn" type="submit">
                        Add Items
                    </button>
                    <br></br>
                    <br></br>
                </form>
                <div>
                    {list.map((c, id) => ( // ws macht er hier genau
                        <Item
                            key={id}
                            id={c.id}
                            item={item}
                            list={list}
                            setList={setList}
                            complete={c.complete}
                            setItem={setItem}
                        />
                    ))}
                </div>
            </div>
        ); */
}

export default App;