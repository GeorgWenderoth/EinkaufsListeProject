package com.adorsys.demo;

import com.adorsys.demo.GroceryService;
import com.sun.jdi.event.StepEvent;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController


public class groceryController {

   // public EinkaufElement element; //Instanzvariable
   /* String einkaufsPunkt = "";
    Integer itId = 0;
    Boolean strich = false; */


    /*@GetMapping ("/einkaufsListe")
    public String zeigePunkt(){
        return  element.getEinkaufsPunkt();
    }
    @PostMapping("/einkaufsListe/{punkt}")
    public void erstellePunkt(@PathVariable String punkt){
        this.element = new EinkaufElement(punkt);
    }
    @GetMapping("/ein")
    @PostMapping("")

    */


    public GroceryService service;
    public groceryController(GroceryService groceryService){ //warum
        this.service = groceryService;
    }

    @CrossOrigin
    @GetMapping ("/einkaufsListeElemente")
    public ResponseEntity<List<EinkaufElement>> getEinkauf(){
        return new ResponseEntity<>(service.getEinkaufElements(), HttpStatus.OK);
    }
    @CrossOrigin
    @PostMapping("/einkaufsListe")
    public ResponseEntity<EinkaufElement> neuerEinkauf(@RequestBody EinkaufElement element){
        System.out.println("Testelement");

        System.out.println( element);
        System.out.println("punkt:" + element.getEinkaufsPunkt());
        System.out.println("id " + element.getItId());
        System.out.println("strich" + element.getStrich());

        final  EinkaufElement einkaufElement = service.erstelleElement(element);
        return  new ResponseEntity<>(einkaufElement, HttpStatus.CREATED); // Warum nochmal returnen

    }

    @CrossOrigin
    @PutMapping("/einkaufsListeAnzahlAendern")
    public ResponseEntity<EinkaufElement> anzahl(@RequestBody EinkaufElement element){
        return new ResponseEntity<>(this.service.änderAnzahl(element.getItId(), element.getAmount()),HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/einkaufsListeDurchgestrichen")
    public ResponseEntity<EinkaufElement> durchstreichen(@RequestBody EinkaufElement element){
           return new ResponseEntity<>(this.service.streicheDurch(element.getItId(), element.getStrich()),HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/einkaufsListeElementLoeschen")
    public ResponseEntity<Void> loescheElement(@RequestBody EinkaufElement element){
        service.loescheElement(element.getItId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
