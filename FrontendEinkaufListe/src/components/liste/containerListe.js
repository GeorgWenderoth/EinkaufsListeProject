import {ListElement} from "./listItem/listElement";
import {Container} from "react-bootstrap";
import React from "react";
import "../../Styles.scss";

/**
 * Rendert die Kacheln / Einkäufe
 * @param props = itemList, updatePunkt, updateDoneOrNot
 * @returns {JSX.Element}
 * @constructor
 */
export function ContainerListe (props) {
    console.log("ContainerListe: ", props.itemList);
        let s = props.itemList;
    return(
        <Container className="container">
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-wrap  justify-content-center reihe">
                    {props.itemList.map((item) => <ListElement item={item} id={item.itId}
                                                                 updatePunkt={props.updatePunkt}
                                                                 updateDoneOrNot={props.updateDoneOrNot}   />) }
                </div>
            </div>
        </Container>
    )
}