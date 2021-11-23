import axios from 'axios';
import React, {useState} from "react";


export function AxiosCalls(props){
    axios({
        method: props.method,
        url: props.url,
        data: {
            //props.ob;
        },
    }).then(item => {
        let punkt = [...this.state.punkt];
        punkt.push(item.data);
        console.log("then post", item.data.itId );
        this.setState({punkt: punkt});
    });
}