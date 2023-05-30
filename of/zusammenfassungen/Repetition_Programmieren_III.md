# Zusammenfassung Programmieren Teil III

Diese Zusammenfassung bietet eine Übersicht über das, was Sie bisher in den Programmierlektionen gesehen haben.

Sie umfasst die folgenden Notebooks:
* 01_erste-Schritte.ipynb
* 02_Programme bestehen aus Befehlen.ipynb
* 03a_Variablen.ipynb
* 03b_for-Schleife.ipynb
* 04_Wahrheitswerte und bedingte Verzweigungen.ipynb
* 05_while-Schleife.ipynb

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
* 1 Sternchen um Bereich \**kursiv\**
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

👉 Kommentare sind super praktisch. Einerseits können Sie mit Hilfe von Kommentaren Notizen machen. Andererseits sind Kommentare hilfreich, wenn Sie einen Fehler suchen oder sehen wollen, was herauskommt, wenn eine oder mehrere Zeilen nicht ausgeführt werden. *Es ist schneller, Code auszukommentieren, anstatt ihn zu löschen und nachher unter Umständen wieder zu schreiben.*

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

👉 **Die fett hervorgehobenen Befehle müssen Sie kennen**, die anderen sollen Sie verstehen, damit Sie Code nachvollziehen können.

### Bisher bekannte Befehle (Funktionen)

| Befehl        | Beschreibung                                                   | 
|:--------------|:------------------------------------------------------------|
| <strong>print()</strong>     | Gibt alle durch Kommas abgetrennten Werte aus.<br/>- Kann beliebig viele Argumente entgegennehmen.<br/>- Macht am Ende der Ausgabe einen Zeilenumbruch.|
| <strong>input(text)</strong> | gibt text aus und erwartet eine Benutzer\*innen-Eingabe.<br/>- Gibt den eingegebenen Wert als String zurück.|
| <strong>int(wert)</strong>   | Wandelt den gegebenen Wert `wert` in einen String um.|
| <strong>type(wert)</strong>  | Gibt den Datentyp des Werts `wert` zurück.<br/>- Der `wert` kann auch ein Ausdruck sein, dann wird dieser ausgewertet (berechnet). |

👉 Beachten Sie, dass input einen String zurückgibt.

* Falls Sie eine Zahl erwarten, müssen Sie die in einen Integer (oder Float) verwandeln!
* In der Regel möchte man die Werte speichern, die eingegeben wurden. Deshalb 

```Python
eingegebene_zahl = int(input("Zahl eingeben:" ))
```

### Turtlebefehle

##### Basisbefehle

| Befehl          | Abkürzung  |  Effekt                                                                |
|:----------------|:-----------|:-----------------------------------------------------------------------|
| <strong>forward(laenge)</strong> | fd(laenge) | bewegt die Turtle um die angegebene Anzahl Pixel vorwärts.             |
| <strong>back(laenge)</strong>    | bk(laenge) | bewegt die Turtle um die angegebene Anzahl Pixel rückwärts.            |
| <strong>right(winkel)</strong>   | rt(winkel) | dreht die Turtle um den angegebenen Winkel (in Grad) nach rechts.      |
| <strong>left(winkel)</strong>    | lt(winkel) | dreht die Turtle um den angegebenen Winkel (in Grad) nach links.       |
|                 |            |                                                                        |
| <strong>hideturtle()</strong>    | ht()       | macht die Turtle unsichtbar.                                           |
| <strong>showturtle()</strong>    | st()       | macht die Turtle sichtbar.                                             |
|                 |            |                                                                        |
|stamp()          | | Die Turtle hinterlässt einen Abdruck. |
|clone()          | | Die Turtle wird dupliziert.<br/>(Es entsteht eine neue Turtle, die einen neuen Namen braucht...) |


##### Befehle zum Stift

| Befehl           | Abkürzung |  Effekt|
|:-----------------|:---------------|:-------|
| <strong>color(farbe)</strong>     | | Farbe der Turtle (und des Stifts), z.B. color("red") |
| pencolor(farbe)  | | Stiftfarbe (bei ausgefüllten Formen: Rand), z.B. pencolor("red") |
| begin_fill()<br/>end_fill()   | | Was zwischen `begin_fill()` und `end_fill()` gezeichnet wird,<br/>wird ausgefüllt.        |
| fillcolor(farbe) | | Füllfarbe  |
| <strong>pensize(pixel)</strong>   | width(pixel) | Stiftbreite |
| circle(r)        | circle(r)    | Kreis mit Radius r |
|                  |              | |
| <strong>penup()</strong>         | pu()         | hebt den Stift von der Zeichenfläche hoch, damit die Turtle nicht mehr zeichnet.|
| <strong>pendown()</strong>        | pd()         | setzt den Stift wieder auf die Zeichenfläche, damit die Turtle wieder zeichnet. |

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

##### Befehle zum «Zustand» (geben einen Boolean zurück)

| Befehl     |  Effekt                                     |
|:-----------|:--------------------------------------------|
|isdown()    | Gibt an, ob der Stift unten ist (schreibt). |
|isvisible() | Gibt an, ob die Turtle sichtbar ist.        |


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
* können in Variablen gespeichert werden (Zuweisung des Werts mit Hilfe des Zuweisungsoperators =)
* haben immer einen Datentyp.

### Datentypen

Bisher kennen Sie die folgenden drei Datentypen:

| Datentyp | Abkürzung | Beschreibung                                                | Beispiel |
|:---------|:----------|:------------------------------------------------------------|:---------|
| <strong>String</strong>   | str       | Text; wird mit Anführungs- und Schlussstrichen markiert     | "Hallo"  |
| <strong>Integer</strong>  | int       | Ganzzahl (ohne Nachkommastelle)                             | 5        |
| <strong>Float</strong>    | float     | Fliesskommazahl (mit Nachkommastelle)                       | 5.0      |
| <strong>Boolean</strong>  | bool      | Wahrheitswert (True und False)                              | True     |

👉 **Es ist wichtig, dass Sie diese Datentypen kennen.**<br/>Mit Text (Datentyp String) können Sie beispielsweise nicht rechnen, dazu benötigen Sie Zahlen (Datentypen: Integer, Float).

Mit dem Befehl `type()` können Sie den Datentyp eines Werts abfragen.

## Operatoren

👉 Operatoren sind enorm wichtig! **Sie müssen sämtliche Operatoren kennen!**

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
| %        | Modulo (Rest der Division)                                  | 5 % 3 —> 2   |
| **       | Potenz                                                      | 2\**4 —> 16   |

**Tipp**: Zum Prüfen, ob eine Variable `v` durch eine Zahl `z` teilbar ist: `v % z == 0`

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

### Vergleichsoperatoren (Relationale Operatoren: ==, !=, <, <=, > und >=)

Dienen dazu, zwei Werte miteinander zu *vergleichen*. Dabei entstehen sogenannte «Elementaraussagen», also Aussagen, die nicht mit einer anderen Aussage verknüpft wurden.

Vergleichsoperatoren lassen sich nur auf Zahlen anwenden. Aus Vergleichsoperationen resultieren Wahrheitswerte.

| Operator  | Beschreibung   | Ausdruck | Gibt `True` zurück, wenn...        |
|:---------:|:---------------|:---------|:-----------------------------------|
| **`==`**  | gleich         | `a == b` | `a` und `b` denselben Wert haben.  |
| **`!=`**  | ungleich       | `a != b` | `a` und `b` ungleiche Werte haben. |
| **`<`**   | kleiner als    | `a < b`  | `a` kleiner als `b` ist.           |
| **`<=`**  | kleiner gleich | `a <= b` | `a` kleiner oder gleich `b` ist.   |
| **`>`**   | grösser als    | `a > b`  | `a` grösser als `b` ist.           |
| **`>=`**  | grösser gleich | `a >= b` | `a`grösser oder gleich `b` ist.    |

### Logische Operatoren (Boolesche Operatoren: not, and, or, ^)

Logische Operatoren verknüpfen Elementaraussagen. Dabei enstehen aus Wahrheitswerten wiederum Wahrheitswerte.

Genauso wie arithmetische Operatoren («Punkt vor Strich») haben auch logische Operatoren eine Rangfolge. Im Zweifelsfall oder um das Ganze übersichtlicher zu machen, können Sie Klammern verwenden, auch wenn diese nicht nötig sind.

In Python werden die logischen Operatoren wie folgt geschrieben (Rangfolge: von oben nach unten): 

| Operator  | Beschreibung                | Ausdruck  | Gibt wahr (`True`) zurück, wenn...   |
|:---------:|:----------------------------|:----------|:-------------------------------------|
| **`not`** | NOT; «nicht»                | `not a`   | `a` `False` ist.                     |
| **`and`** | AND; «and«                  | `a and b` | `a` und `b` `True` sind.             |
| **`or`**  | OR; «oder» (einschliessend) | `a or b`  | `a` oder `b` oder beide `True` sind. |
|||||
| **`^`**   | XOR*; «entweder oder» (ausschliessendes Oder) |`a ^ b`   | entweder `a` oder `b` `True` ist. |

\* XOR ist kein Grundoperator und es kann gut sein, dass Sie den Operator beim Programmieren kaum je brauchen werden.

## Variablen

* Variablen haben einen **Namen** und einen **Wert**.
* Mit dem Zuweisungsoperator (=) wird einer Variable ein Wert zugewiesen, z.B. `schule = "KWI"`.  
  Dabei werden zwei Fälle unterschieden:
    * Falls die Variable noch nicht exisitert, wird sie *erstellt*.  
    * Falls die Variable schon exisitert, erhält sie den neuen Wert (der alte Wert wird *überschrieben*).
* Um den Wert der Variable zu verwenden: Variablennamen schreiben, z.B. `print(schule)` führt zur Ausgabe `KWI`.
* Verwenden Sie «sprechende» Namen für Variablen: `schule` sagt in diesem Beispiel mehr aus als `a` oder `bob`.  \
  Wenn Sie Ihre Variablen sinnvoll benennen, verstehen Sie ihren Code auch später noch. 

## Fehlermeldungen

👉 Fehlermeldungen sind sehr praktisch, denn sie weisen uns darauf hin, was bei unserem Code nicht läuft! **Sie müssen die folgenden Fehlermeldungen kennen!**


Haben Sie keine Angst vor Fehlermeldungen und versuchen Sie von Anfang an möglichst viel daraus zu lesen. Sie bringen Sie beim Programmieren weiter. 

| Fehler      | Beschreibung            | Beispiel     |
|:------------|:------------------------|:-------------|
| <strong>TypeError</strong> | <strong>falscher Datentyp</strong>: Sie verwenden Werte, die den falschen Datentyp haben. |`t.left("45")` statt `t.left(45)` |
| <strong>NameError</strong>   | Der <strong>Name</strong> ist <strong>nicht bekannt</strong>: Sie greifen auf etwas zu, das es nicht gibt.<br/>Das kann eine Variable sein, ein Befehl, die Turtle `t` oder sonst etwas.<br/>Oft passiert dies auch, wenn Sie vergessen, einen String mit Anführungs- und Schlussstrichen zu markieren.<br/>Wenn Sie in unseren Notebooks ein Turtleprogramm machen und vergessen, die Zelle auszuführen, die den Befehl<br/>`prepareTurtleGraphics()` definiert, wird dieser Fehler ebenfalls auftreten.  |`print(hallo)` statt `print("hallo")`|
| <strong>SyntaxError</strong> | Wenn Sie etwas schreiben, das gegen die Python-Regeln verstösst. | `5 = a` statt `a = 5`, <br/>nicht geschlossene Klammern, fehlende Doppelpunkte bei Kontrollstrukturen|
| <strong>IndentationError</strong>| Etwas wurde <strong>falsch eingerückt</strong>.<br/>In Python ist es besonders wichtig, dass alle Zeilen korrekt eingerückt werden.|`print("Hallo")`<br/>&nbsp;&nbsp;`print("Tschüss)`|


## Kontrollstrukturen

Wiederholungen (Schleifen) und bedingte Verzweigungen sind Kontrollstrukturen. Sie ermöglichen uns, den Programmablauf zu steuern und Blöcke wiederholt oder nur unter gewünschten Umständen auszuführen.

### Bedingte Verzweigungen: if – elif – else

Bedingte Verzweigungen behandeln Fallunterscheidungen und ermöglichen es, Codeblöcke nur unter bestimmten Bedingungen auszuführen.

**Syntax**

```Python
if Bedingung1:
    # wenn-Block (wird ausgeführt, wenn Bedingung1 erfüllt ist)
elif Bedingung2: # optional
    # sonst-wenn-Block (optional; wird ausgeführt, wenn Bedingung2 erfüllt ist (und Bedingung 1 nicht))
elif Bedingung3:
    # weiterer sonst-wenn-Block (optional; wird ausgeführt, wenn Bedingung3 erfüllt ist (und die vorherigen Bedingungen nicht))
else:
    # sonst-Block (optional; wird ausgeführt, wenn keine der obigen Bedingungen erfüllt ist)
```

Nach dem Ausführen eines Blocks wird die Struktur verlassen und es geht nach der Verzweigung weiter. Es wird also immer *höchstens ein Block ausfegührt*: Entweder der `if`-Block oder der `else`-Block oder ein `elif`-Block.

⚠️ Achten Sie auf die Doppelpunkte und die Einrückungen.

Es werden folgende Verzweigungen unterschieden:
* Einseitige Verzweigung: nur `if`-Block
* Zweiseitige Verzweigung: `if`- und `else`-Block
* mehrstufige Verzweigung: mit einem oder mehreren `elif`-Blöcken (`else`-Block: optional aber ratsam)

| Einseitige Verzweigung  | zweiseitige Verzweigung | mehrstufige Verzweigung |
|:----------|:---------------|:----------|
|||
  |<img src="./bilder/Flussdiagramm_if.svg" style="width:80%"/>|<img src="./bilder/Flussdiagramm_if-else.svg" style="width:80%"/> |<img src="./bilder/Flussdiagramm_if-elif-else.svg" style="width:80%"/>|
|||


### Schleifen (auch Loops genannt): for, while

Mit Hilf von Schleifen können Codeblöcke wiederholt ausgeführt werden. Sie setzen sich wie folgt zusammen:

* Schleifenkopf
  * beschreibt, *wie* wiederholt werden soll,
  * endet mit einem **Doppelpunkt**.
* Schleifenkörper
  * beschreibt, *was* wiederholt werden soll,
  * ist **eingerückt**

Der Schleifenkopf wird bei jedem Schleifendurchgang ausgeführt. Der Schleifenkörper wird nur ausgeführt wenn die Ausführung des Schleifenkopfs ergibt, dass die Schleife noch nicht verlassen werden kann.

#### For-Schleife

For-Schleifen sind **zählergesteuert**. Es gibt also eine Schleifenvariable (in Beispielen wird sie oft `i` genannt), die Werte aus einem Bereich annimmt, «den Bereich durchläuft».

**Syntax**

```Python
for i in range(anzahl_wiederholungen): 
    # Schleifenkörper
```

`i` ist die **Schleifenvariable** (auch «Zähler», «Zählvariable», «Laufvariable» oder «Index»). 
* Sie dürfen auch gerne «sprechende Namen» verwenden! 
* Die Schleifenvariable gibt es strenggenommen nur innerhalb der Schleife.  
  ⚠️ Greifen Sie niemals ausserhalb einer Schleife auf eine Schleifenvariable zu!
  
##### Welcher Bereich wird durchlaufen?

👉 **range(4)** bedeutet: «Bereich **von 0 bis und *ohne* 4**».

Da dieser Bereich vier Werte beinhaltet, können Sie `range(anzahl_wiederholungen)` für die For-Schleife verwenden.

Schauen Sie sich mit Hilfe der `print()`-Funktion die Schleifenvariable an und merken Sie sich gleich folgendes:

```Python
for i in range(5): # i durchläuft den BEREICH von 0 bis und OHNE 5
    print(i)       # wird 0, 1, 2, 3, 4 ausgeben...

print(i)           # Am Ende der Schleife sollten Sie die Schleifenvariable VERGESSEN!
```

#### While-Schleife

While-Schleifen sind **bedingungsgesteuert**. Der Schleifenkörper wird so lange ausgeführt, wie die Bedingung erfüllt ist. Danach wird der Code unterhalb der Schleife ausgeführt.

**Syntax**

```Python
while Bedingung: 
    # Schleifenkörper
```

Achten Sie auch hier auf den Doppelpunkt und die Einrückungen.

⚠️ Wichtig bei der While-Schleife ist, dass die Bedingung irgendwann erfüllt sein muss, damit die Schleife abgebrochen werden kann. 


In Python gibt es zwei Arten von Schleifen, die zählergesteuerte For-Schleife und die bedingungsgesteuerte While-Schleife.

| For-Schleife  | While-Schleife      |
|:----------|:---------------|
| zählergesteuert<br/>Die Schleifenvariable dient als Zähler | bedingungsgesteuert<br/>Die Schleife wird solange durchlaufen, wie die Bedingung erfüllt ist. |
|||
|<img src="./bilder/Flussdiagramm-Schleife-zaehlergesteuert.svg" style="width:80%"/>|<img src="./bilder/Flussdiagramm-Schleife-kopfgesteuert.svg" style="width:80%"/> | 
|||

#### Verschachtelte Schleifen
Schleifen dürfen auch verschachtelt werden:

* for in for
* for in while
* while in for
* while in while

Beispiel Fünfeck mit gestrichelten Linien:
```Python
# Lösung Challenge
(t, tScreen) = prepareTurtleGraphics()
for seite in range(5):      # äussere Schleife
    for strich in range(5): # innere Schleife
        t.fd(5)
        t.penup()
        t.fd(5)
        t.pendown()
    t.left(360/5)
t.hideturtle()
```
## Module

Befehle wie `input()` und `print()` sind in jedem Programm verfügbar. Damit Sie in Ihren Programmen die Turtlebefehle nutzen können, müssen sie erst geladen werden. Stellen Sie sich vor, dass Sie nur Zugriff auf Vokabeln einer Sprache haben, wenn Sie das entsprechende «Wörterbuch» geladen haben. Genauso ist es beim Programmieren. Wörterbücher heissen hier **Module**.

Damit Sie ein Modul in einem  Programm verwenden können, müssen Sie es importieren:

```Python
import modulname
```
Um auf Befehle oder Werte des Moduls zuzugreifen, schreiben Sie *`modulname.`* gefolgt vom Befehl oder der Variable.

### Modul random

Das Modul `random` stellt Ihnen alles zur Verfügung, was Sie benötigen, um mit Zufallszahlen zu arbeiten.

* Die Funktion `randint(a,b)` liefert eine ganzzahlige Zufallszahl im Bereich von a bis und mit b.

**Beispiel**: Ein Würfel kann die Werte 1 bis 6 anzeigen. Der Bereich reicht also von 1 bis und mit 6. Einen Wurf könnten Sie also wie folgt darstellen:

```Python
import random # Modul importieren («Befehle laden»)

wurf = random.randint(1,6)
```
*Die Funktion `randint()` aus dem Modul random wird aufgerufen und der erhaltene Wert (zufällige ganze Zahl im Bereich von 1 bis und mit 6) wird in der Variable wurf gespeichert.*
