package com.adorsys.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity //gibt bekannt das, dass Element eine Jpa entity ist -> Repository
public class EinkaufElement{ 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itId;
    private String einkaufsPunkt;
    private boolean strich;
    private int amount;
    private String notizen;


    public EinkaufElement(int itId, String einkaufsPunkt , boolean strich, int amount, String notizen){
        this.itId = itId;
        this.einkaufsPunkt = einkaufsPunkt;
        this.strich = strich;
        this.amount = amount;
        this.notizen = notizen;
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

    public String getNotizen() {
        return notizen;
    }

    public void setNotizen(String notizen) {
        this.notizen = notizen;
    }
}
