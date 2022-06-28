import {Button} from "react-bootstrap";
import React, {useState} from "react";
import "./header.scss";
import {ErrorMessage, Formik, Form, Field} from 'formik';


export function EinkaufHeader(props){



    /**
     * Übergibt eingabe (Itemname) an props.handleSubmit
     * @param event
     */
   /* const handleSubmitHeader=(event)=>{
        event.preventDefault(); //event.preventDefault  seite wird nicht mehr selbstständig geladen wegen onSubmit
        props.handleSubmit(value.einkaufspunkt);
    } */

    const onSubmit = (values, { setSubmitting}) => {
        props.handleSubmit(values.einkaufspunkt).finally( ()=> {
            setSubmitting(false);
        });

    }
    /**
     * Überprüft ob die Eingaben korrekt sind, gibt Fehlermeldung aus wenn nicht
     * @param values
     * @returns {{}}
     */
    const validate = (values)=> {
        const errors = {};
        console.log("Values: ", values);
        if(!values.einkaufspunkt){
            errors.einkaufspunkt = "Einkaufspunk is needed"
        }
         if (/[^a-zA-Z0-9 -]+/g.test(values.einkaufspunkt)  ){
            errors.einkaufspunkt = 'Invalid Einkaufspunkt -> Keine Sonderzeichen';
        }
         if(!/[a-zA-Z]+/g.test(values.einkaufspunkt) ){
             errors.einkaufspunkt = 'Mindestens ein buchstabe'
         }
        return errors;
    }

    /**
     * speichert veränderungen bei der eingabe onChange im state
     * @param event
     */
  /* const handleChange =(event) => {
        setValue(event.target.value); //warum geschweifte klammern
       // console.log(value);
    } */

    return(
        <div className="header">
            <h1 className="ueberschrift">Digitale Einkaufsliste</h1>
            <Formik initialValues={{einkaufspunkt: ""}} validate={validate} onSubmit={onSubmit}>
                {
                    ({
                        isSubmitting,
                        errors,
                        values,


                    }) => (
                        <Form className="row g-3 justify-content-center"/*className="addButton"*/
                            /*onSubmit={handleSubmitHeader}*/ >
                            <div className="col-auto">
                                <Field type="text" name={"einkaufspunkt"}  className="form-control"  id="inp" placeholder="Einkaufspunkt"/>
                                <ErrorMessage name={"einkaufspunkt"} />
                            </div>
                            <div className="col-auto">
                                <Button type="submit" className="btn-secondary">Hinzufügen</Button>
                            </div>
                            <div className="col-auto"> <Button className="btn-secondary"> Login</Button></div>
                        </Form>

                    )


                }

            </Formik>
            
        </div>
    )
}


