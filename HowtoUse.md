# Einkaufs Liste

Das Projekt ist eine Einkaufsliste

Es enthält Frontend und Backend,


# Build with

Frontend:
- React.js
- Bottstrap
- Bootstrap React



Backend:
- Java 11
- Java Springboot
- JpaRepository

# How to use

## Installation

git clone https://git.adorsys.de/gwe/EinkaufsListeProjekt.git



## Frontend 

cd FrontendEinkaufListe/

npm install 

npm start 

## Backend

cd BackendEinkaufListe/

mvn install 

mvn run

 DemoApplication.java  ausführen


 # Anwendung 

Auf port http://localhost:3000/?

Mit dem Eingabe Feld im Header kann man Einkäufe hinzufügen, diese erscheinen dann als Rote Kacheln unter dem Header.

Fügt man dem genanten Artikel eine Zahl hinzu, so wird diese als zu kaufende Menge angezeigt.
Zb. "Apfel 9" wird zu "Apfel"  mit der Anzahl "9". 

Durch einen Klick auf Eine Rote Kachel kann man einen Einkauf als erledigt Makieren.
Darauf hin wandert er unter erldedigte Einkäufe (unter den Unerledigen Roten Einkäufen) und Wird Grün. 
Mit einen Klick auf den Button "Erledigte Einkäufe Löschen" werden die erledigten Einkäufe gelöscht.

Wenn man Auf das Stiftsymbol bei den Unerledigten (roten) Einkäufen klickt kann man die einkäufe Bearbeiten. 
Im anschließend erscheinenden Bearbeitungsmenü kann man den Namen des Artikels und die Anzahl bearbeiten. Desweiteren kann man auch noch Notzien hinzufügen oder bearbeiten, diese sind jedoch nur im Bearbeitungsmenu sichtbar. 