import {ListElement} from "./listItem/listElement";
import {Container} from "react-bootstrap";
import React from "react";
import "../../Styles.scss";


export function ContainerListe (props) {


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