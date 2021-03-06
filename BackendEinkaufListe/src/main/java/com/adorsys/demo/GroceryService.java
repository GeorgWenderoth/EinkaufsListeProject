package com.adorsys.demo;


import com.adorsys.demo.rest.ElementNichtVorhanden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
/**
 * Service, wird vom Grocerycontroller aufgerufen, und fürt die zurgrüffe / änderungen am Repository durch
 */
public class GroceryService {

    @Autowired
    private EinkaufRepository repository;

    public GroceryService(){
    }

    public List<EinkaufElement> getEinkaufElements(){
        return repository.findAll();
    }

    public EinkaufElement erstelleElement(EinkaufElement element) {


        return repository.save(element);
    }

    public List<EinkaufElement> getEinkaufElementsByStrich(boolean strich){
        return repository.findAllByStrich(strich);
    }

    public EinkaufElement sucheElement(int id){
        return this.repository.findByItId(id).orElseThrow(() -> new ElementNichtVorhanden("Das Gesuchte Element ist nicht vorhanden"));
    }


    /**
     * Fürt die updates von änderungen am Modal durch
     * @param id
     * @param amount
     * @param einkaufsPunkt
     * @param notizen
     * @return
     */
    public EinkaufElement updateElementM(int id, int amount, String einkaufsPunkt, String notizen){
        EinkaufElement element = this.sucheElement(id);
        element.setAmount(amount);
        element.setEinkaufsPunkt(einkaufsPunkt);
        element.setNotizen(notizen);
        repository.save(element);
        return element;
    }

    /**
     * Ändert von Done auf Undone und von Undone auf Done
     * @param id
     * @param strich
     * @return
     */
    public EinkaufElement streicheDurch(int id, boolean strich){
        EinkaufElement element = this.sucheElement(id);
        if(element.getStrich()){
            element.setStrich(false);
        } else {
            element.setStrich(true);
        }
         repository.save(element);
        return element;
    }



    public void loescheElement(int id){
        EinkaufElement element = this.sucheElement(id);

        this.repository.delete(element);
    }

    /**
     * Löscht alle erledigten elemente
     */
    public void loescheElementeDone(){
        List<EinkaufElement> l = repository.findAllByStrich(true);
        this.repository.deleteAll(l);
    }



}
