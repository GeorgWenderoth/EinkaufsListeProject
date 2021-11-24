import axios from 'axios';
import React, {useState} from "react";

/**
 * Übernimmt die axios calls anhand der übergebenen parameter, und returnt das propmise / ergebnis
 * @param method
 * @param url
 * @param object
 * @returns {AxiosPromise}
 * @constructor
 */
export function AxiosCalls(method,url, object){
   const call = axios({
        method: method,
        url: url,
        data: object,
    })
    return call;
}