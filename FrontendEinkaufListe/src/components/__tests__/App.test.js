import {fireEvent, render, screen} from "@testing-library/react";
import App from "../App";
import * as Axios from "../../utils/axiosCalls";
import {Card} from "react-bootstrap";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
import {shallow} from "enzyme";

jest.mock("../../utils/axiosCalls")
 let expectedData;
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
    fireEvent.change(input, {target: {value: 'kaufen2'}})
    button.click();

    expect(Axios.AxiosCalls).toBeCalled();
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

  //  expect(Axios.AxiosCalls).toBeCalled();
   /* expect(expectedData).toEqual({
        "einkaufsPunkt": "kaufen",
        "strich": false,
        "itId": 100,
        "amount": 1,
    }) */
    expect(screen.getByDisplayValue("kaufen")).toBeVisible();
})

test("UndoneElementChangesToDoneElementWhenClicked", ()=>{
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
    const app = shallow(<App/>)
    const utils = render(<App/>)

    const button = screen.getByText("Hinzufügen")
    const input = utils.getByPlaceholderText('Einkaufspunkt')
    fireEvent.change(input, {target: {value: 'kaufen'}})
    button.click();
    const element = screen.getByDisplayValue('kaufen');
    element.click();

   // const u = render(<Lis)
    //let component = utils.toJSON();
    //console.log(component);
    console.log("expectedData: ", app.state("punktErledigt")[0])
    expect(app.state("punktErledigt")[0]).toBeDefined;
    /*toBe({
        "einkaufsPunkt": "kaufen",
        "strich": false,
        "itId": 100,
        "amount": 1,
    }); */
})



