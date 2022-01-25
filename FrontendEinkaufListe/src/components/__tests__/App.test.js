import {act, fireEvent, render, screen} from "@testing-library/react";
import renderer from 'react-test-renderer';
import App from "../App";
import * as Axios from "../../utils/axiosCalls";
import {ListElement} from "../liste/listItem/listElement";
import {ContainerListe} from "../liste/containerListe";

import {Card} from "react-bootstrap";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
import {shallow} from "enzyme";
import React from "react";

jest.mock("../../utils/axiosCalls")
 let expectedData;

describe('submit tests', ()=> {

    it('should remove spaces', ()=> {
        Axios.AxiosCalls = jest.fn( (method,url, object)=>{
            console.log("LOG: ", method, url, object)
            expectedData = object;
            return Promise.resolve({data: object});
        })
        const utils = render(<App/>);

        const button = screen.getByText("Hinzufügen")
        const input = utils.getByPlaceholderText('Einkaufspunkt')
        fireEvent.change(input, {target: {value: ' kürbis '}})
        button.click();
        expect(expectedData).toEqual({
            "einkaufsPunkt": "kürbis",
            "strich": false,
            "itId": 100,
            "amount": 1,
        });
    });
    it('should take the last number as amount',  () => {
        Axios.AxiosCalls = jest.fn( (method,url, object)=>{
            console.log("LOG: ", method, url, object)
            expectedData = object;
            return Promise.resolve({data: object});
        })
        const utils = render(<App/>);
        const button = screen.getByText("Hinzufügen")
        const input = utils.getByPlaceholderText('Einkaufspunkt')
        fireEvent.change(input, {target: {value: 'blume6'}})
        button.click();
        expect(expectedData).toEqual({
            "einkaufsPunkt": "blume",
            "strich": false,
            "itId": 100,
            "amount": 6,
        });
    });
    it('should take the last number as amount, remove all spaces between einkaufspunkt and nummber', ()=>  {
        Axios.AxiosCalls = jest.fn( (method,url, object)=>{
            console.log("LOG: ", method, url, object)
            expectedData = object;
            return Promise.resolve({data: object});
        })
        const utils = render(<App/>);
        const button = screen.getByText("Hinzufügen")
        const input = utils.getByPlaceholderText('Einkaufspunkt')
        fireEvent.change(input, {target: {value: 'blume     6'}})
        button.click();
        expect(expectedData).toEqual({
            "einkaufsPunkt": "blume",
            "strich": false,
            "itId": 100,
            "amount": 6,
        });
    });
    it('should take only the last number as amount,',  () =>  {
        Axios.AxiosCalls = jest.fn( (method,url, object)=>{
            console.log("LOG: ", method, url, object)
            expectedData = object;
            return Promise.resolve({data: object});
        })
        const utils = render(<App/>);
        const button = screen.getByText("Hinzufügen")
        const input = utils.getByPlaceholderText('Einkaufspunkt')
        fireEvent.change(input, {target: {value: '5 gum7 8'}})
        button.click();
        expect(expectedData).toEqual({
            "einkaufsPunkt": "5 gum7",
            "strich": false,
            "itId": 100,
            "amount": 8,
        });
    });
    it('should take no special chars',  () =>  { //funktioniert nicht
        Axios.AxiosCalls = jest.fn( (method,url, object)=>{
            console.log("LOG: ", method, url, object)
            expectedData = object;
            return Promise.resolve({data: object});
        })
        const utils = render(<App/>);
        const button = screen.getByText("Hinzufügen")
        const input = utils.getByPlaceholderText('Einkaufspunkt')
        fireEvent.change(input, {target: {value: 'comand()'}})
        button.click();
        expect(expectedData).toEqual({ //anderes expect oder so
            "einkaufsPunkt": "comand",
            "strich": false,
            "itId": 100,
            "amount": 1,
        });
    });
    it('should not submit empty string,',  () =>  {
        Axios.AxiosCalls = jest.fn( (method,url, object)=>{
            console.log("LOG: ", method, url, object)
            expectedData = object;
            return Promise.resolve({data: object});
        })
        const utils = render(<App/>);
        const button = screen.getByText("Hinzufügen")
        const input = utils.getByPlaceholderText('Einkaufspunkt')
        fireEvent.change(input, {target: {value: ''}})
        button.click();
        expect(expectedData).toEqual({ //falsch
            "einkaufsPunkt": "5 gum7",
            "strich": false,
            "itId": 100,
            "amount": 8,
        });
    });
})

test("submitSpaces", () => {
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        return Promise.resolve({data: object});
    })
    const utils = render(<App/>);

    const button = screen.getByText("Hinzufügen")
    const input = utils.getByPlaceholderText('Einkaufspunkt')
    fireEvent.change(input, {target: {value: ' kürbis '}})
    button.click();
    expect(expectedData).toEqual({
        "einkaufsPunkt": "kürbis",
        "strich": false,
        "itId": 100,
        "amount": 1,
    })
})


test("HandleSubmit", ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
    console.log("LOG: ", method, url, object)
        expectedData = object;
        return Promise.resolve({data: {
                "itId": 100,
                "einkaufsPunkt": "kaufen",
                "strich": false,
                "amount": 2,
            }});
    })
    const utils = render(<App/>)
    const button = screen.getByText("Hinzufügen")
    const input = utils.getByPlaceholderText('Einkaufspunkt')
    fireEvent.change(input, {target: {value: 'kaufen                  2'}})
    button.click();

    expect(Axios.AxiosCalls).toBeCalledTimes(3);
    expect(expectedData).toEqual({
        "einkaufsPunkt": "kaufen",
        "strich": false,
        "itId": 100,
        "amount": 2,
    })

   /* const fn = jest.AxiosCalls();
    when(fn).lastCalledWith(1).mockReturnValue() */
})

test("HandleSubmitWithoutNumber", ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        return Promise.resolve({data: {
                "itId": 100,
                "einkaufsPunkt": "kaufen",
                "strich": false,
                "amount": 1,
            }});
    })
    const utils = render(<App/>)
    const button = screen.getByText("Hinzufügen")
    const input = utils.getByPlaceholderText('Einkaufspunkt')
    fireEvent.change(input, {target: {value: 'kaufen'}})
    button.click();

    expect(Axios.AxiosCalls).toBeCalled();
    expect(expectedData).toEqual({
        "einkaufsPunkt": "kaufen",
        "strich": false,
        "itId": 100,
        "amount": 1,
    })

})

test("HandleSubmitWithoutNumberState", ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        return Promise.resolve({data: object});
    })

    const utils = render(<App/>)
    const button = screen.getByText("Hinzufügen")
    const input = utils.getByPlaceholderText('Einkaufspunkt')
    fireEvent.change(input, {target: {value: 'kaufen'}})
    button.click();

    expect(screen.getByDisplayValue("kaufen")).toBeVisible();
})

/*test("UndoneElementChangesToDoneElementWhenClicked", ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        return Promise.resolve({data: {
                "itId": 100,
                "einkaufsPunkt": "kaufen",
                "strich": false,
                "amount": 1,
            }});
    })
    //const app = shallow(<App/>)
    const utils = render(<App/>)
    const app = shallow(<App/>)

    const input = app.find("input");
    fireEvent.change(input, {target: {value: 'kaufen'}})
    app.find("button").simulate("click");
    const spy = jest.spyOn(app.instance(), "updatePunktStrichDoneOrNot");
    app.instance().updatePunktStrichDoneOrNot(100,true);


    console.log("expectedData: ", app.state("punktErledigt"));
    console.log("expectedData: ", app.state("punkt"));
    expect(app.state("punktErledigt")).toBeDefined();
    /*toBe({
        "einkaufsPunkt": "kaufen",
        "strich": false,
        "itId": 100,
        "amount": 1,
    });
}) */




    describe("App", () => {

        it("renders correctly", () => {
            Axios.AxiosCalls = jest.fn( (method,url, object)=>{
                console.log("LOG: ", method, url, object)
                expectedData = object;
                if(method === "get" && object === "NotDone"){
                    return Promise.resolve({data: [{
                            "itId": 99,
                            "einkaufsPunkt": "birne",
                            "strich": false,
                            "amount": 1,
                        }]});
                } else if(method === "get" && object === "Done"){
                    return Promise.resolve({data: [{
                            "itId": 101,
                            "einkaufsPunkt": "apfel",
                            "strich": true,
                            "amount": 1,
                        }]});
                } else if(method ==="post"){
                    return Promise.resolve({data: object});
                }

            })
          const app = shallow(<App />);

           // const {rerender} = render(<App />);

            console.log("punkt after shallow: ", app.state('punkt'));
            const spy = jest.spyOn(app.instance(), "updatePunktStrichDoneOrNot");
            //const mount = jest.spyOn(app.);
            const thisStateUpdate = jest.spyOn(app.instance(), "back");
            app.instance().back();
            //expect(app.instance().back).toHaveBeenCalledTimes(2);
           // app.instance().black().b
           // app.instance().forceUpdate();

          //  app.instance().updatePunktStrichDoneOrNot(100,false);
            //expect(app.state('punkt')).toEqual([]);
           // expect(app.state('punktErledigt')).toBeDefined();
            console.log("punktErledigt after shallow3 : ", app.state('punktErledigt'));
            console.log("cdu: ", app.componentDidUpdate);

            if((app.instance().back).toHaveBeenCalledTimes(1)){
                console.log("punkt after shallow 4: ", app.state('punkt'));
                console.log("punktErledigt after shallow4 : ", app.state('punktErledigt'));
                expect(app.state('punkt')).toEqual([]);
                expect(app.state('punktErledigt')).toBeDefined();
                expect(app.state('punktErledigt')).toEqual([]);
            }
           // app.render(<App/>);
           // app.update(<App/>);
            //rerender(<App/>);
          //  console.log("punkt after shallow 4: ", app.state('punkt'));
          //  console.log("punktErledigt after shallow4 : ", app.state('punktErledigt'));
           // console.log("punkt after shallow z: ", z.state('punkt'));
           // console.log("punktErledigt after shallow z : ", z.state('punktErledigt'));

           // expect(app.state('punkt')).toEqual([]);
           // expect(app.state('punktErledigt')).toBeDefined();
           // expect(app.state('punktErledigt')).toEqual([]);
            //expect(z.state('punkt')).toEqual([]);
           // expect(z.state('punktErledigt')).toBeDefined();
           // expect(z.state('punktErledigt')).toEqual([]);
        });
    });

test("DeleateElementInBackend", async ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        if(method === "get" && object === "NotDone"){
            return Promise.resolve({data: [{
                    "itId": 99,
                    "einkaufsPunkt": "birne",
                    "strich": false,
                    "amount": 1,
                }]});
        } else if(method === "get" && object === "Done"){
            return Promise.resolve({data: [{
                    "itId": 101,
                    "einkaufsPunkt": "apfel",
                    "strich": true,
                    "amount": 1,
                }]});
        } else if(method ==="post"){
            return Promise.resolve({data: object});
        }

    })
    const utils = render(<App/>);

    const button = screen.getByText("Hinzufügen")
    const loeschButton = screen.getByText("Erledigte Einkäufe löschen")
    const input = screen.getByPlaceholderText('Einkaufspunkt')
     fireEvent.change(input, {target: {value: 'orange'}})

     fireEvent.click(button);
   // utils.update(<App/>);

    let element = await screen.getByText('birne');
    console.log("elementDeleateLog ", element);


  /*
  act(() => {
        render(<App/>);
    })

    act(() => {
        fireEvent.change(input, {target: {value: 'kaufen'}})

    })

    act(() => {
        fireEvent.click(button);
    })

   const element = screen.getByText(/kaufen/);
    console.log("elementDeleateLog ", element);
    act(() => {
        fireEvent.click(element);

    })
    act(() => {
        fireEvent.click(loeschButton);
    }) */
    expect(Axios.AxiosCalls).toBeCalledTimes(3);
    //expect(element).toBeUndefined();

})

  /*  jest.mock("../liste/containerListe", () => ({

        ContainerListe: (props) => {
            const MockName = "containerListe";
            return <MockName {...props} />;
        },
    })); */

test("Rendering the ListElement with correct with the props ",  ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        if(method === "get" && object === "NotDone"){
            return Promise.resolve({data: [{
                    "itId": 99,
                    "einkaufsPunkt": "birne",
                    "strich": false,
                    "amount": 1,
                }]});
        } else if(method === "get" && object === "Done"){
            return Promise.resolve({data: [{
                    "itId": 101,
                    "einkaufsPunkt": "apfel",
                    "strich": true,
                    "amount": 1,
                }]});
        } else if(method ==="post"){
            return Promise.resolve({data: object});
        }

    })
   const item = {
        "itId": 102,
        "einkaufsPunkt": "kürbis",
        "strich": false,
        "amount": 1,
    }

   const utils = render(<ListElement item={item} id={item.itId}
                       /* updatePunkt={props.updatePunkt}
                        updateDoneOrNot={props.updateDoneOrNot} */  />);
    expect(screen.getByText("kürbis")).toBeVisible;
    expect(screen.getByText("k")).toBeVisible;
    expect(screen.getByText("1")).toBeVisible;

})

test("ListElement erledigen ", async ()=>{
   /* Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        if(method === "get" && object === "NotDone"){
            return Promise.resolve({data: [{
                    "itId": 99,
                    "einkaufsPunkt": "birne",
                    "strich": false,
                    "amount": 1,
                }]});
        } else if(method === "get" && object === "Done"){
            return Promise.resolve({data: [{
                    "itId": 101,
                    "einkaufsPunkt": "apfel",
                    "strich": true,
                    "amount": 1,
                }]});
        } else if(method ==="post"){
            return Promise.resolve({data: object});
        }

    }) */
    let item = {
        "itId": 102,
        "einkaufsPunkt": "kürbis",
        "strich": false,
        "amount": 1,
    }
   const updateDoneOrNot = jest.fn(()=>{

        item.strich = true;

    })


    const utils = render(<ListElement item={item} id={item.itId}
        // updatePunkt={props.updatePunkt}
         updateDoneOrNot={updateDoneOrNot}   />);

   // const elementClass = await document.getElementsByClassName("cardStyle card cardColourRed")//.classList//.contains("cardColourGreen");

    const wrapper = shallow(<Card.Body onClick={updateDoneOrNot}/>);
    wrapper.find('div').at(0).simulate('click');
    const test = shallow(<Card className="cardStyle"/>)

    const elementClass = test.firstChild;


    //const test = screen.getElementsByTagName(<div className="cardStyle cardColourRed card"/>)
    //const button = shallow((<div className="card-body"/> ));
    //button.find('button').simulate('click');
   /* const cardBody = utils.find(".card-body");
    act(()=> {
        fireEvent.click(cardBody);
    }) */

    //const elementClass = document.getElementsByClassName("cardStyle").classList.contains("cardColourGreen");


    expect(elementClass.className).toEqual("cardColourGreen");
    expect(screen.getByText("kürbis")).toBeVisible;
    expect(screen.getByText("k")).toBeVisible;
    expect(screen.getByText("1")).toBeVisible;
})

test("ListElement change Details",  ()=>{
    Axios.AxiosCalls = jest.fn( (method,url, object)=>{
        console.log("LOG: ", method, url, object)
        expectedData = object;
        if(method === "get" && object === "NotDone"){
            return Promise.resolve({data: [{
                    "itId": 99,
                    "einkaufsPunkt": "birne",
                    "strich": false,
                    "amount": 1,
                }]});
        } else if(method === "get" && object === "Done"){
            return Promise.resolve({data: [{
                    "itId": 101,
                    "einkaufsPunkt": "apfel",
                    "strich": true,
                    "amount": 1,
                }]});
        } else if(method ==="post"){
            return Promise.resolve({data: object});
        }

    })

    const item = {
        "itId": 102,
        "einkaufsPunkt": "kürbis",
        "strich": false,
        "amount": 1,
    }

    const utils = render(<ListElement item={item} id={item.itId}
        /* updatePunkt={props.updatePunkt}
         updateDoneOrNot={props.updateDoneOrNot} */  />);





    expect(screen.getByText("kürbis")).toBeVisible;
    expect(screen.getByText("k")).toBeVisible;
    expect(screen.getByText("1")).toBeVisible;

})

test('SnapshotListElementErledigen', () => {
    const item = {
        "itId": 102,
        "einkaufsPunkt": "kürbis",
        "strich": false,
        "amount": 1,
    }
    const component = shallow(<ListElement item={item} id={item.itId}
        /* updatePunkt={props.updatePunkt}
         updateDoneOrNot={props.updateDoneOrNot} */  />,);
    const button = component.find('.Card.Body');
    button.simulate('click');


    expect(component.find('Card').toHaveClass('cardColourGreen'));
    //let tree = component.toJSON();
    //expect(tree).toMatchSnapshot();

    //tree.props.;
   // tree = component.toJSON();
   // expect(tree).toMatchSnapshot();
})








