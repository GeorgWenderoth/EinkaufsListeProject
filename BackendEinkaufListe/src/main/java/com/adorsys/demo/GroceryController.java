package com.adorsys.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
/**
 * Controller
 * APi-Schnittstellen
 */
public class GroceryController {

    public GroceryService service;
    
    public GroceryController(GroceryService groceryService){ //warum
        this.service = groceryService;
    }

    /**
     * Gibt alle nicht erledigten Einkäufe zurück
     * @return
     */
    @CrossOrigin
    @GetMapping ("/einkaufsListeElementeNotDone")
    public  ResponseEntity<List<EinkaufElement>> getEinkaufUndone(){
        return new  ResponseEntity<>(service.getEinkaufElementsByStrich(false),HttpStatus.OK);
    }

    /**
     * Gibt alle erledigten Einkäufe zurück
     * @return
     */
    @CrossOrigin
    @GetMapping ("/einkaufsListeElementeDone")
    public  ResponseEntity<List<EinkaufElement>> getEinkaufDone(){
        return new  ResponseEntity<>(service.getEinkaufElementsByStrich(true),HttpStatus.OK);
    }

    @Deprecated
    @CrossOrigin
    @GetMapping ("/einkaufsListeElemente")
    public ResponseEntity<List<EinkaufElement>> getEinkauf(){
        return new ResponseEntity<>(service.getEinkaufElements(), HttpStatus.OK);
    } 

    /**
     * Fügt einen neuen Einkauf hinzu
     * @param element
     * @return
     */
    @CrossOrigin
    @PostMapping("/einkaufsListe")
    public ResponseEntity<EinkaufElement> neuerEinkauf(@RequestBody EinkaufElement element){
        final  EinkaufElement einkaufElement = service.erstelleElement(element);
        return  new ResponseEntity<>(einkaufElement, HttpStatus.CREATED); // Warum nochmal returnen
    }

    /**
     * ändert den status auf durchgestrichen/ erledigt oder unerledigt / nicht durchgestrichen
     * @param element
     * @return
     */
    @CrossOrigin
    @PutMapping("/einkaufsListeDurchgestrichen")
    public ResponseEntity<EinkaufElement> durchstreichen(@RequestBody EinkaufElement element){
           return new ResponseEntity<>(this.service.streicheDurch(element.getItId(), element.getStrich()),HttpStatus.OK);
    }

    /**
     * Updated element
     * @param element
     * @return
     */
    @CrossOrigin
    @PutMapping("/einkaufsListeUpdateM")
    public ResponseEntity<EinkaufElement> update(@RequestBody EinkaufElement element){
        return new ResponseEntity<>(this.service.updateElementM(element.getItId(), element.getAmount(), element.getEinkaufsPunkt(), element.getNotizen()),HttpStatus.OK);
    }

    @Deprecated
    @CrossOrigin
    @DeleteMapping("/einkaufsListeElementLoeschen")
    public ResponseEntity<Void> loescheElement(@RequestBody EinkaufElement element){
        service.loescheElement(element.getItId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Löscht alle erledigten elemente
     */
    @CrossOrigin
    @DeleteMapping("/einkaufssListeElementeDoneLoeschen")
    public void loescheAllDoneElements(){
        service.loescheElementeDone();
        return ;
    }
}
