package com.adorsys.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity //gibt bekannt das, dass Element eine Jpa entity ist -> Repository

public class EinkaufElement{  // Hier sind die daten für das gesamte json objekt brauche ich keine getteruns setter

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   // private int id;
    private int itId;
    private String einkaufsPunkt;
    private boolean strich;
    private int amount;



    public EinkaufElement(int itId, String einkaufsPunkt , boolean strich, int amount){
        this.itId = itId;
        this.einkaufsPunkt = einkaufsPunkt;
        this.strich = strich;
        this.amount = amount;
    }

    public EinkaufElement() {

    }




    public int getItId(){
        return itId;
    }

    public void setItId(int itId){
        this.itId = itId;
    }


    public String getEinkaufsPunkt(){
        return einkaufsPunkt;
    }


    public void setEinkaufsPunkt(String einkaufsPunkt) {
        this.einkaufsPunkt = einkaufsPunkt;
    }

    public Boolean getStrich(){
        return strich;
    }

    public void setStrich(Boolean strich){
        this.strich = strich;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    /*   public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    } */


}



