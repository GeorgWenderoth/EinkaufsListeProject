import axios from 'axios';
import React, {useState} from "react";


export function AxiosCalls(method,url, object){
    console.log("objekt axiocall ",object);
   const call = axios({
        method: method,
        url: url,
        data: object,/*{
            "itId": object.itId,
            "einkaufsPunkt": object.einkaufsPunkt,
            "strich": object.strich,
            "amount": object.amount,
        }, */
    })
       /*.then(item => {
        let punkt = [...this.state.punkt];
        punkt.push(item.data);
        console.log("then post", item.data.itId );
        this.setState({punkt: punkt});
    }); */
    console.log("return call: ", call);
    return call;
}