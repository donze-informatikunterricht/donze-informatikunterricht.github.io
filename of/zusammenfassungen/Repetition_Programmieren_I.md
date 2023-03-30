
# Prüfungsvorbereitung Teil I

Diese Zusammenfassung bietet eine Übersicht über das, was Sie bisher in den Programmierlektionen gesehen haben.

Sie umfasst die folgenden Notebooks:
* 01_erste-Schritte.ipynb
* 02_Programme bestehen aus Befehlen.ipynb
* 03a_Variablen.ipynb

## Dateien ablegen

Wenn Sie die Dateien herunterladen, finden Sie diese im Explorer (Windows) bzw. Finder (macOS) im Ordner «Downloads». Da dort alle Dateien landen, wird es da schnell unübersichtlich. Dateien für den Informatikunterricht speichern wir im Ordner «Infoamatik», Dateien fürs Programmieren im Ordner «Programmieren». Wo Sie den Ordner Informatik speichern, ist Ihre Entscheidung. Ein guter Ort ist das KWI-OneDrive, aber es gibt auch Schülerinnen und Schüler, die den Informatikordner im Ordner Dokumente oder auf dem Schreibtisch haben. Wichtig ist, dass Sie ihn finden und dass es da drin so aussieht:

<ul style="list-style-type: none;">
    <li>📂 Informatik</li>
    <ul style="list-style-type: none;">
        <li>📂 Programmieren</li>
        <ul style="list-style-type: none;">
            <li>📄 01_erste Schritte.ipynb</li>
            <li>📂 bilder</li>
            <ul style="list-style-type: none;">
                <li>📄 aufgabe-markdown.png</li>                
                <li>📄 jupyter-menu.png</li>
                <li>📄 schmetterling.png</li>
            </ul>
        </ul>
    </ul>
</ul>

«Programmieren» enthält die Notebooks (.ipynb) und den Ordner «bilder». «bilder» ist kleingeschrieben und enthält alle Bilder. Wenn Sie mehrere Bilder herunterladen, müssen Sie diese in den Ordner «bilder» entpacken (Windows: Rechtsklick: «alle extrahieren», macOS: Doppelklicken und verschieben).

## Arbeiten mit dem Jupyter Notebook

<img src="./bilder/jupyter-menu.png" alt="Hier müsste ein Bild sein!!!"/>

* Sie kennen den Unterschied zwischen Code- und Text- (oder Markdown-)Zellen.
* Sie führen Codezellen mit dem  Run-Knopf (►) im Menü oder der Tastenkombination [⇧]+[↩︎] (([Hochstelltaste]+[Eingabetaste]) bzw. [Shift]+[Enter]) aus.
* Sie können das Menü nutzen, um neue Zellen zu erstellen und Zellen zu verschieben.
* Sie wissen, dass [ * ] links von einer Codezelle bedeutet, dass diese Zelle noch nicht fertig ausgeführt wurde und können notfalls die Ausführung mit dem Eintrag [◼️] abbrechen, damit Sie weiterarbeiten können. 

### Markdown

Dient dazu, Text formatiert darzustellen. Formatieren mit 
* 1 Sternchen um Bereich \**kursiv**
* 2 Sternchen um Bereich \*\***fett**\*\*
* 3 Sternchen um Bereich \*\*\****fett kursiv***\*\*\*
* 1 Sternchen (\*) gefolgt von einem Leerschlag (ohne Bereich): Bullet Liste (nummeriert mit 1. statt Sternchen)
    1. Geht auch mit Nummerierung
    2. und Einrücken.
* Zeilenumbruch: 2 Leerschläge  
  oder eine Leerzeile
* 3 Sternchen (\*\*\*) auf einer Zeile: feine horizontale Trennlinie:
***

## Kommentare

Kommentare werden nicht ausgeführt.

* einzeilige Kommentare: alles, was auf einer Zeile auf eine Raute `#` folgt.
* mehrzeilige Kommentare: alles, was zwischen ''' und ''' bzw. zwischen """ und """ steht.

```Python
# Dies ist ein einzeiliger Kommentar

'''
Dies ist ein mehr-
zeiliger Kommentar
'''
```

## Befehle

* Wenn ein Programm ausgeführt wird, werden Befehle von oben nach unten ausgeführt.

* Befehle haben einen Namen und Argumente in Klammern.

### Bisher bekannte Befehle (Funktionen)

| Befehl        | Beschreibung                                                   | 
|:--------------|:------------------------------------------------------------|
| `print()`     | Gibt alle durch Kommas abgetrennten Werte aus.<br/>- Kann beliebig viele Argumente entgegennehmen.<br/>- Macht am Ende der Ausgabe einen Zeilenumbruch.|
| `input(text)` | gibt text aus und erwartet eine Benutzer\*innen-Eingabe.<br/>- Gibt den eingegebenen Wert als String zurück.|
| `int(wert)`   | Wandelt den gegebenen Wert `wert` in einen String um.|
| `type(wert)`  | Gibt den Datentyp des Werts `wert` zurück.<br/>- Der `wert` kann auch ein Ausdruck sein, dann wird dieser ausgewertet (berechnet). |

### Turtlebefehle

##### Basisbefehle

| Befehl          | Abkürzung  |  Effekt                                                                |
|:----------------|:-----------|:-----------------------------------------------------------------------|
| forward(laenge) | fd(laenge) | bewegt die Turtle um die angegebene Anzahl Pixel vorwärts.             |
| back(laenge)    | bk(laenge) | bewegt die Turtle um die angegebene Anzahl Pixel rückwärts.            |
| right(winkel)   | rt(winkel) | dreht die Turtle um den angegebenen Winkel (in Grad) nach rechts.      |
| left(winkel)    | lt(winkel) | dreht die Turtle um den angegebenen Winkel (in Grad) nach links.       |
|                 |            |                                                                        |
| hideturtle()    | ht()       | macht die Turtle unsichtbar.                                           |
| showturtle()    | st()       | macht die Turtle sichtbar.                                             |
|                 |            |                                                                        |
|stamp()          | | Die Turtle hinterlässt einen Abdruck. |
|clone()          | | Die Turtle wird dupliziert.<br/>(Es entsteht eine neue Turtle, die einen neuen Namen braucht...) |


##### Befehle zum Stift

| Befehl           | Abkürzung |  Effekt|
|:-----------------|:---------------|:-------|
| color(farbe)     | | Farbe der Turtle (und des Stifts), z.B. color("red") |
| pencolor(farbe)  | | Stiftfarbe (bei ausgefüllten Formen: Rand), z.B. pencolor("red") |
| begin_fill()<br/>end_fill()   | | Was zwischen `begin_fill()` und `end_fill()` gezeichnet wird,<br/>wird ausgefüllt.        |
| fillcolor(farbe) | | Füllfarbe  |
| pensize(pixel)   | width(pixel) | Stiftbreite |
| circle(r)        | circle(r)    | Kreis mit Radius r |
|                  |              | |
| penup()          | pu()         | hebt den Stift von der Zeichenfläche hoch, damit die Turtle nicht mehr zeichnet.|
| pendown()        | pd()         | setzt den Stift wieder auf die Zeichenfläche, damit die Turtle wieder zeichnet. |
| isdown()         | | Gibt den Status des Stifts zurück: `true` für *down*, `false` für *up*. |

Für die **Farben** können Sie gängige Farbnamen verwenden, z.B. "red", "green","blue", "orange", "purple", ... [Hier finden Sie 140 Farben mit ihren Codes.](https://trinket.io/docs/colors)<!--[Hier finden Sie eine Liste der möglichen Farbnamen](https://www.w3schools.com/colors/colors_names.asp)-->

##### Befehle zum Hintergrund (Zeichenbereich)

Auch die Hintergrundfarbe des Zeichenbereichs können Sie verändern. Den folgenden Befehl wenden Sie nicht auf die Turtle `t` an, sondern auf die Zeichenfläche `tScreen`:

| Befehl    | Effekt |
|:----------|:-------|
| bgcolor() | Hintergrundfarbe definieren<br/>z.B. tScreen.bgcolor("lavender") |


##### Befehle zum «Aufräumen»

| Befehl    | Abkürzung  |  Effekt                                                                |
|:----------|:---------------|:-------|
|home()     | | bringt die Turtle wieder zur Mitte des Bildschirms und lässt sie wieder nach rechts blicken.<br/>Dabei ist der Stift in der gleichen Position (up oder down) wie vorher.|
|clear()    | | Löscht die Zeichnung; die Turtle bleibt an der Position, an der sie war. |
|reset()    | | Löscht die Zeichnung und bringt die Turtle in den Anfangszustand zurück<br/>(Mitte, Ausrichtung nach Rechts, schwarzer Stift, ...) |

## Turtle

* Bevor Sie die Turtle in einem Notebook verwenden, müssen Sie die Zelle ausführen, die den Befehl `prepareTurtleGraphics()` definiert:

```Python
# Führen Sie diese Zelle aus, damit Sie weiter unten Turtlegrafiken machen können...

import ipyturtle3 as turtle

def prepareTurtleGraphics(width=500, height=250):
    ...
    return (t, turtleScreen)
```

* Am Anfang des Turtleprogramms müssen Sie die folgende Zeile schreiben:
```Python
(t, tScreen) = prepareTurtleGraphics() # eine Turtle t und einen Zeichenbereich tScreen erstellen
```
* Danach müssen Sie die Turtlebefehle auf die Turtle `t` oder den Zeichenbereich `tScreen` anwenden:

Beispiel:
```Python
t.forward(100)
tScreen.bgcolor("black")
```

## Werte

* können berechnet werden
* können in Variablen gesprichert werden (mit Hilfe des Zuweisungsoperators)
* haben immer einen Datentyp.

### Datentypen

Bisher kennen Sie die folgenden drei Datentypen:

| Datentyp | Abkürzung | Beschreibung                                                | Beispiel |
|:---------|:----------|:------------------------------------------------------------|:---------|
| String   | str       | Text; wird mit Anführungs- und Schlussstrichen markiert     | "Hallo"  |
| Integer  | int       | Ganzzahl (ohne Nachkommastelle)                             | 5        |
| Float    | float     | Fliesskommazahl (mit Nachkommastelle)                       | 5.0      |

Mit dem Befehl `type()` können Sie den Datentyp eines Werts abfragen.


## Operatoren

### Zuweisungsoperator (=)

Um einer Variable einen Wert zuzuweisen, wird der Zuweisungsoperator **=** verwendet:
```Python
a = 2  
b = 5
```

### Arithmetische Operatoren (+, -, \*, /, //, % und ** )

| Operator | Operation                                                   | Beispiel      | 
|:--------:|:------------------------------------------------------------|:--------------|
| +        | Addition                                                    | 5 + 4 —> 9    |
| -        | Subtraktion                                                 | 5 - 4 —> 1    |
| *        | Multiplikation                                              | 5 * 4 —> 20   |
| /        | Division                                                    | 5 / 4 —> 1.25 |
| //       | Ganzzahlige Division <br/>(abgerundet bzw. «abgeschnitten») | 5 // 3 —> 1   |
| %        | Modulo (Rest der Division)                                  | 5 % 3 —> 2    |
| **       | Potenz                                                      | 2\**4 —> 16   |

#### Kurzschreibweisen

Für die arithmetischen Operatoren gibt es auch die entsprechenden Kurzschreibweisen:

| Operator | Kurzschreibweise | Bedeutung   | 
|:--------:|:-----------------|:------------|
| +        | a += 1           | a = a + 1   |
| -        | a -= 1           | a = a - 1   |
| *        | a *= 2           | a = a * 2   |
| /        | a /= 2           | a = a / 2   |
| //       | a //= 2          | a = a // 2  |
| %        | a %= 2           | a = a % 2   |
| **       | a \**= 2         | a = a \** 2 |

## Variablen

* Variablen haben einen **Namen** und einen **Wert**.
* Mit dem Zuweisungsoperator (=) wird einer Variable ein Wert zugewiesen, z.B. `schule = "KWI"`.  
  Dabei werden zwei Fälle unterschieden:
    * Falls die Variable noch nicht exisitert, wird sie *erstellt*.  
    * Falls die Variable schon exisitert, erhält sie den neuen Wert (der alte Wert wird *überschrieben*).
* Um den Wert der Variable zu verwenden: Variablennamen schreiben, z.B. `print(schule)` führt zur Ausgabe `KWI`.
* Verwenden Sie «sprechende» Namen für Variablen: "schule" sagt in diesem Beispiel mehr aus als `a` oder `bob`.  \
  Wenn Sie Ihre Variablen sinnvoll benennen, verstehen Sie ihren Code auch später noch. 

## Fehlermeldungen

Fehlermeldungen sind sehr praktisch! 

Haben Sie keine Angst vor Fehlermeldungen und versuchen Sie von Anfang an möglichst viel daraus zu lesen. Sie bringen Sie beim Programmieren weiter. 

| Fehler      | Beschreibung                                                   | Beispiel     |
|:-----------:|:------------------------------------------------------------|:-------------|
| TypeError   | falscher Datentyp: Sie verwenden Werte, die den falschen Datentyp haben. |`t.left("45")` statt `t.left(45)` |
| NameError   | Der Name ist nicht bekannt: Sie greifen auf etwas zu, das es nicht gibt.<br/>Das kann eine Variable sein, ein Befehl, die Turtle `t` oder sonst etwas.<br/>Oft passiert dies auch, wenn Sie vergessen, einen String mit Anführungs- und Schlussstrichen zu markieren.<br/>Wenn Sie ein Turtleprogramm machen und vergessen, die Zelle auszuführen, die den Befehl<br/>`prepareTurtleGraphics()` definiert, kann dieser Fehler ebenfalls auftreten.  |`print(hallo)` statt `print("hallo")`|
| SyntaxError | Wenn Sie etwas schreiben, das gegen die Python-Regeln verstösst. | `5 = a` statt `a = 5`|
| IndentationError| Etwas wurde falsch eingerückt.<br/>In Python ist es besonders wichtig, dass alle Zeilen korrekt eingerückt werden.|`print("Hallo")`<br/>&nbsp;&nbsp;`print("Tschüss)`|

