import ipywidgets as widgets
from IPython.display import clear_output

def create_multipleChoice_widget(description, options, correct_answer):
    if correct_answer not in options:
        options.append(correct_answer)
    
    correct_answer_index = options.index(correct_answer)
    
    layout = widgets.Layout(width='auto', height='auto') #set width and height
    
    radio_options = [(words, i) for i, words in enumerate(options)]
    alternativ = widgets.RadioButtons(
        
        options = radio_options,
        description = '',
        disabled = False,
        layout = layout
    )
    
    description_out = widgets.Output()
    with description_out:
        print(description)
        
    feedback_out = widgets.Output()

    def check_selection(b):
        a = int(alternativ.value)
        if a==correct_answer_index:
            s = "✅ richtig"
        else:
            s= "🚫 falsch"#"❌ falsch"
        with feedback_out:
            clear_output()
            print(s)
        return
    
    check = widgets.Button(description="submit")
    check.on_click(check_selection)
    
    
    return widgets.VBox([description_out, alternativ, check, feedback_out])


####

# Listen

q1 = create_multipleChoice_widget('Welche dieser Listen wird korrekt erstellt?',
                                         ['früchte = "Apfel", "Birne", "Banane"',
                                          'früchte = ("Apfel", "Birne", "Banane")',
                                          'früchte = ["Apfel", "Birne", "Banane"]',
                                          'früchte = {"Apfel", "Birne", "Banane"}'],
                                         'früchte = ["Apfel", "Birne", "Banane"]')

q2 = create_multipleChoice_widget('Welche dieser Listen wird korrekt erstellt?',
                                         ['a = [1,2,"a"]',
                                          '[1,2,3] = a',
                                          'beide',
                                          'keine'],
                                         'a = [1,2,"a"]')

q3 = create_multipleChoice_widget('meine_liste = ["k","w","i"]\nWie können Sie meine_liste ausgeben?',
                                         ['show(meine_liste)',
                                          'print(meine_liste)',
                                          'output(meine_liste)',
                                          'return meine_liste'],
                                         'print(meine_liste)')

q4 = create_multipleChoice_widget('meine_liste = ["k","w","i"]\nWie können Sie herausfinden, wie viele Elemente meine_liste enthält?',
                                         ['meine_liste[1]',
                                          'meine_liste.len',
                                          'meine_liste.len()',
                                          'len(meine_liste)'],
                                         'len(meine_liste)')

q5 = create_multipleChoice_widget('Wie greifen Sie auf das erste Element der Liste meine_liste zu?',
                                         ['meine_liste(0)',
                                          'meine_liste(1)',
                                          'meine_liste[0]',
                                          'meine_liste[1]',
                                          ],
                                         'meine_liste[0]')

q6 = create_multipleChoice_widget('meine_liste = [1, "🙂", 0.75]\nWas kommt beim Zugriff meine_liste[1] heraus?',
                                         ['1',
                                          '"🙂"',
                                          'TypeError',
                                          'SyntaxError',
                                          'IndexError'],
                                         '"🙂"')

q7 = create_multipleChoice_widget('meine_liste = [1, "🙂", 0.75]\nWas kommt beim Zugriff meine_liste[-1] heraus?',
                                         ['0.75',
                                          '"🙂"',
                                          '-0.75',
                                          'IndexError'],
                                         '0.75')

q8 = create_multipleChoice_widget('meine_liste = [1, "🙂", 0.75]\nWelche der folgenden Aussagen ist korrekt?',
                                         ['len(meine_liste) liefert den Wert -3.',
                                          'meine_liste[1] liefert den Wert 1.',
                                          'meine_liste[len(meine_liste)] führt zu einem IndexError.',
                                          'Alle dieser Aussagen sind korrekt.',
                                          'Keine dieser Aussagen ist korrekt.'],
                                         'meine_liste[len(meine_liste)] führt zu einem IndexError.')

q9 = create_multipleChoice_widget('a = [1,2,3,4,5]\nWas ist das Ergebnis der folgenden Rechnung: len(a) + a[len(a)-3] * a[1]?',
                                         ['7',
                                          '8'
                                          '9',
                                          '10',
                                          '11',
                                          '12',
                                          '13'],
                                         '11')

q10 = create_multipleChoice_widget('a = [1,2,3,4,5]\nBei welchem Aufruf wird NICHT die ganze Liste ausgegeben?',
                                         ['print(a)',
                                          'print(a[:])',
                                          'print(a[::])',
                                          'print(a[:len(a)])',
                                          'Alle Befehle führen zur Ausgabe der ganzen Liste.'],
                                         'Alle Befehle führen zur Ausgabe der ganzen Liste.')

q11 = create_multipleChoice_widget('for i in range(10):\n    print(i)\nWelche Werte werden ausgegeben?',
                                         ['von 0 bis und mit 10',
                                          'von 1 bis und mit 10',
                                          'von 0 bis und ohne 10',
                                          'von 1 bis und ohne 10'],
                                         'von 0 bis und ohne 10')

q12 = create_multipleChoice_widget('aufsteigend = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nfor i in aufsteigend:\n    print(i)\nWelche Werte werden ausgegeben?',
                                         ['von 0 bis und mit 10',
                                          'von 1 bis und mit 10',
                                          'von 0 bis und ohne 10',
                                          'von 1 bis und ohne 10'],
                                         'von 1 bis und mit 10')

q13 = create_multipleChoice_widget('aufsteigend = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nfor i in aufsteigend[a:b:c]:\n    print(i)\nWas müssen Sie für aufsteigend[a:b:c] einsetzen, um nur gerade Zahlen zu erhalten?',
                                         ['aufsteigend[0:5:2]',
                                          'aufsteigend[1::2]',
                                          'aufsteigend[0::2]',
                                          'aufsteigend[1:2:]', 
                                          'aufsteigend[0:2:]'],
                                         'aufsteigend[1::2]')

q14 = create_multipleChoice_widget('Wäre es erlaubt, die beiden Zeilen\nmitglied = gruppe.pop(3)\ngruppe.append(mitglied)\ndurch die Zeile\ngruppe.append(gruppe.pop(3))\nzu ersetzen?',
                                         ['ja',
                                          'nein'],
                                         'ja')

q15 = create_multipleChoice_widget('Was machen die beiden Zeilen der letzten Frage?',
                                         ['Der 2. Wert wird aus der Liste gelöscht und ersetzt das letzte Element der Liste.',
                                          'Der 2. Wert wird aus der Liste gelöscht und hinten in die Liste eingefügt.',
                                          'Der 3. Wert wird aus der Liste gelöscht und ersetzt das letzte Element der Liste.',
                                          'Der 3. Wert wird aus der Liste gelöscht und hinten in die Liste eingefügt.',
                                          'Der 4. Wert wird aus der Liste gelöscht und ersetzt das letzte Element der Liste.',
                                          'Der 4. Wert wird aus der Liste gelöscht und hinten in die Liste eingefügt.'],
                                         'Der 4. Wert wird aus der Liste gelöscht und hinten in die Liste eingefügt.')

q16 = create_multipleChoice_widget('Wie viele Elemente enthält die Liste am Ende des Programms?',
                                         ['4',
                                          '5',
                                          '6',
                                          '7'],
                                         '6')

q17 = create_multipleChoice_widget('Wie sieht die Liste gruppe am Ende aus?',
                                         ['["Laura", "Alessia", "Benjamin", "Chloé", "Daniel", "Emilie"]',
                                          '["Alessia", "Benjamin", "Chloé", "Daniel", "Emilie"]',
                                          '["Alessia", "Benjamin", "Chloé", "Daniel", "Laura"]',
                                          '["Alessia", "Benjamin", "Chloé", "Daniel", "Emilie", "Laura"]',
                                          '["Alessia", "Benjamin", "Sarina", "Chloé", "Laura", "Daniel"]',
                                          '["Alessia", "Benjamin", "Chloé", "Sarina", "Laura", "Daniel"]'],
                                         '["Alessia", "Benjamin", "Chloé", "Sarina", "Laura", "Daniel"]')



################################################################################
# ALTE QUIZZES
################################################################################

# Erste Schritte

Q1_erste_schritte = create_multipleChoice_widget('Welchen Datentyp haben die Variablen a und b?',
                                         ['Boolean',
                                          'String',
                                          'Integer',
                                          'Float'],
                                         'Integer')

Q2_erste_schritte = create_multipleChoice_widget('Was gibt das Programm zurück?',
                                         ['27',
                                          '28',
                                          '29',
                                          '30'],
                                         '28')

Q3_erste_schritte = create_multipleChoice_widget('Wie oft wird die Schleife ausgeführt?',
                                         ['gar nie',
                                          'fünfmal',
                                          'zehnmal',
                                          'vierundzwanzigmal'],
                                         'fünfmal')

Q4_erste_schritte = create_multipleChoice_widget('Was würde das Programm ausgeben, wenn in Zeile 5 ein > wäre anstelle des <= ?',
                                         ['0',
                                          '10',
                                          '28',
                                          '24'],
                                         '0')

# Listen

Q1_listen = create_multipleChoice_widget('Welche Werte nimmt die Laufvariable i im folgenden Loop an? for i in range(10):',
                                         ['von 0 bis und mit 10',
                                          'von 1 bis und mit 10',
                                          'von 0 bis und ohne 10',
                                          'von 1 bis und ohne 10'],
                                         'von 0 bis und ohne 10')

Q2_listen = create_multipleChoice_widget('Welchen Wert nimmt el im folgenden Loop  NICHT  an? for el in c:',
                                         ['0',
                                          '1',
                                          '2',
                                          '3',
                                          '4'],
                                         '0')



Q3_listen = create_multipleChoice_widget('liste=[0 for x in range(5)] Was ist der Rückgabewert von len(liste)?',
                                         ['0',
                                          '4',
                                          '5',
                                          '6'],
                                         '5')

Q4_listen = create_multipleChoice_widget('Wie greifen Sie auf das erste Element einer Liste liste zu?',
                                         ['liste[0]',
                                          'liste[1]',
                                          'liste(0)',
                                          'liste(1)'],
                                         'liste[0]')

Q5_listen = create_multipleChoice_widget('Wie geben Sie eine Liste liste unter der Codezelle (oder in der Konsole) aus?',
                                         ['return liste',
                                          'output liste',
                                          'output(liste)',
                                          'print(liste)'],
                                         'print(liste)')

Q6_listen = create_multipleChoice_widget('Was ist das Ergebnis der folgenden Rechnung: a+c[len(c)-3]*len(b)?',
                                         ['Keines, es gibt eine Fehlermeldung',
                                          '55',
                                          '5',
                                          '-5'],
                                         '55')

### Algorithmen

Q1_algorithmen = create_multipleChoice_widget('Welche dieser Aktivitäten ist eher kein Algorithmus?',
                                              ['Zähneputzen.',
                                               'Schuhe binden.',
                                               'Im Fussballspiel ein Goal schiessen.', 
                                               'Schwimmen.'],
                                              'Im Fussballspiel ein Goal schiessen.')

Q2_algorithmen = create_multipleChoice_widget('Warum ist es wichtig, einen Algorithmus genau zu beschreiben?',
                                              ['Weil er sonst macht, was er will.',
                                               'Weil jederzeit klar sein muss, was zu tun ist.',
                                               'Weil die Ausführung sonst zu lange dauert.', 
                                               'Weil sonst falsche Ausgaben entstehen können.'],
                                              'Weil jederzeit klar sein muss, was zu tun ist.')
Q3_algorithmen = create_multipleChoice_widget('Wie nennt man die Eigenschaft aus der vorigen Frage?',
                                              ['Allgemeinheit',
                                               'Ausführbarkeit',
                                               'Eindeutigkeit',
                                               'Endlichkeit',
                                               'Korrektheit'],
                                              'Eindeutigkeit')

# Suchen

Q1_suchen = create_multipleChoice_widget('Schauen Sie sich die Liste a an. Welchen Suchalgorithmus würden Sie bevorzugen, um den Wert 24 zu suchen?',
                                         ['Lineare Suche',
                                          'Binäre Suche',
                                          'Beide Suchalgorithmen sind gleichermassen geeignet.',
                                          'Keiner der beiden Suchalgorithmen ist geeignet.'],
                                         'Keiner der beiden Suchalgorithmen ist geeignet.')

Q2_suchen = create_multipleChoice_widget('Schauen Sie sich die Liste b an. Welchen Suchalgorithmus würden Sie bevorzugen, um den Wert 24 zu suchen?',
                                         ['Lineare Suche',
                                          'Binäre Suche',
                                          'Beide Suchalgorithmen sind gleichermassen geeignet.',
                                          'Keiner der beiden Suchalgorithmen ist geeignet.'],
                                         'Binäre Suche')

Q3_suchen = create_multipleChoice_widget('Schauen Sie sich die Liste c an. Welchen Suchalgorithmus würden Sie bevorzugen, um den Wert 24 zu suchen?',
                                         ['Lineare Suche',
                                          'Binäre Suche',
                                          'Beide Suchalgorithmen sind gleichermassen geeignet.',
                                          'Keiner der beiden Suchalgorithmen ist geeignet.'],
                                         'Lineare Suche')

Q4_suchen = create_multipleChoice_widget('Wenn Sie den Wert 24 in der Liste b mit Hilfe der binären Suche  suchen, wieviele Schritte benötigen Sie?',
                                         ['1',
                                          '4',
                                          '5',
                                          '10'],
                                         '4')

Q5_suchen = create_multipleChoice_widget('Wenn Sie den Wert 24 in der Liste c mit Hilfe der linearen Suche suchen, wieviele Schritte benötigen Sie?',
                                         ['10',
                                          '5',
                                          '1',
                                          '0'],
                                         '1')

# Insertion Sort
Q1_insertion = create_multipleChoice_widget('Sie sortieren eine Liste mit 20 Elementen mit dem Insertion-Sort-Algorithmus. Sie beobachten 190 Vergleiche. Was können Sie über die sortierte Liste aussagen?',
                                         ['Sie war sortiert.',
                                          'Sie war umgekehrt sortiert.',
                                          'Sie war zufällig sortiert',
                                          'Das ist gar nicht möglich.'],
                                         'Sie war umgekehrt sortiert.')

Q2_insertion = create_multipleChoice_widget('Sie sortieren eine Liste mit 20 Elementen mit dem Insertion-Sort-Algorithmus. Sie beobachten 10 Vergleiche. Was können Sie über die sortierte Liste aussagen?',
                                         ['Sie war sortiert.',
                                          'Sie war umgekehrt sortiert.',
                                          'Sie war zufällig sortiert',
                                          'Das ist gar nicht möglich.'],
                                         'Das ist gar nicht möglich.')

Q3_insertion = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Insertion-Sort-Algorithmus. Wie sieht die Liste nach dem 2. Durchgang aus?',
                                         ['[2, 3, 7, 1, 6, 8, 4, 0, 5, 9]',
                                          '[1, 2, 3, 7, 6, 8, 4, 0, 5, 9]',
                                          '[1, 2, 3, 6, 7, 8, 4, 0, 5, 9]',
                                          '[1, 2, 3, 4, 6, 7, 8, 0, 5, 9]'],
                                         '[2, 3, 7, 1, 6, 8, 4, 0, 5, 9]')

Q4_insertion = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Insertion-Sort-Algorithmus. Wie viele Vergleiche erwarten Sie?',
                                         ['9',
                                          '24',
                                          '45',
                                          '90'],
                                         '24')

Q5_insertion = create_multipleChoice_widget('Sie sortieren eine Liste mit 20 Elementen mit dem Insertion-Sort-Algorithmus. Sie beobachten 19 Vergleiche. Was muss die Ausgangslage sein?',
                                         ['sortiert',
                                          'umgekehrt sortiert',
                                          'zufällig',
                                          'Das ist gar nicht möglich.'],
                                         'sortiert')

# Selection Sort
Q1_selection = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Selection-Sort-Algorithmus. Wie viele Vergleiche erwarten Sie?',
                                         ['10',
                                          '19',
                                          '45',
                                          '90'],
                                         '45')

Q2_selection = create_multipleChoice_widget('Sie sortieren eine Liste mit 10 Elementen mit dem Selection-Sort-Algorithmus. Sie beobachten 45 Vergleiche. Was können Sie über die sortierte Liste aussagen?',
                                         ['Sie war sortiert.',
                                          'Sie war umgekehrt sortiert.',
                                          'Sie war zufällig sortiert',
                                          'Selection Sort ist für alle Ausgangslagen gleich.'],
                                         'Selection Sort ist für alle Ausgangslagen gleich.')

Q3_selection = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Selection-Sort-Algorithmus. Wie sieht die Liste nach dem 2. Durchgang aus?',
                                         ['[0, 1, 7, 3, 6, 8, 4, 2, 5, 9]',
                                          '[0, 3, 7, 1, 6, 8, 4, 2, 5, 9]',
                                          '[3, 4, 1, 6, 5, 9, 7, 0, 2, 8]',
                                          '[0, 1, 2, 3, 6, 8, 4, 7, 5, 9]'],
                                         '[0, 1, 7, 3, 6, 8, 4, 2, 5, 9]')

Q4_selection = create_multipleChoice_widget('Sie sortieren eine Liste mit 20 Elementen mit dem Selection-Sort-Algorithmus. Sie beobachten 19 Vergleiche. Was können Sie über die sortierte Liste aussagen?',
                                         ['Sie war sortiert.',
                                          'Sie war umgekehrt sortiert.',
                                          'Sie war zufällig sortiert',
                                          'Es ist keine Aussage möglich.'],
                                         'Es ist keine Aussage möglich.')

Q5_selection = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Selection-Sort-Algorithmus. Wie viele Vergleiche erwarten Sie?',
                                         ['9',
                                          '24',
                                          '45',
                                          '90'],
                                         '45')

# Bubble Sort
Q1_bubble = create_multipleChoice_widget('Sie sortieren eine Liste mit 20 Elementen mit dem maximal optimierten Bubble-Sort-Algorithmus. Sie beobachten 19 Vergleiche. Was können Sie über die sortierte Liste aussagen?',
                                         ['Sie war sortiert.',
                                          'Sie war umgekehrt sortiert.',
                                          'Sie war zufällig sortiert',
                                          'Das ist gar nicht möglich.'],
                                         'Sie war sortiert.')

Q2_bubble = create_multipleChoice_widget('Sie sortieren eine Liste mit 20 Elementen mit dem Bubble-Sort-Algorithmus. Sie beobachten 19 Vergleiche. Was können Sie über die Optimierung aussagen?',
                                         ['Keine Optimierung: Brute Force.',
                                          'Nur der unsortierte Teil wird angeschaut (Optimierung 1).',
                                          'Es wird überprüft, ob die Liste sortiert ist (Optimierung 2).',
                                          'Das ist gar nicht möglich.'],
                                         'Es wird überprüft, ob die Liste sortiert ist (Optimierung 2).')

Q3_bubble = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Bubble-Sort-Algorithmus. Wie sieht die Liste nach dem 2. Durchgang aus?',
                                         ['[2, 3, 7, 1, 6, 8, 4, 0, 5, 9]',
                                          '[1, 2, 3, 7, 6, 8, 4, 0, 5, 9]',
                                          '[2, 1, 3, 6, 4, 0, 5, 7, 8, 9]',
                                          '[1, 2, 3, 4, 0, 5, 6, 7, 8, 9]'],
                                         '[2, 1, 3, 6, 4, 0, 5, 7, 8, 9]')

Q4_bubble = create_multipleChoice_widget('Sie sortieren eine umgekehrt sortierte Liste mit dem Bubble-Sort-Algorithmus und Sie haben alle Optimierungen implementiert. Wie viele Vergleiche erwarten Sie?',
                                         ['9',
                                          '45',
                                          '81',
                                          '90'],
                                         '45')

Q5_bubble = create_multipleChoice_widget('Sie sortieren die gegebene Liste a mit dem Bubble-Sort-Algorithmus und Sie keine Optimierungen implementiert. Wie viele Vergleiche erwarten Sie?',
                                         ['9',
                                          '45',
                                          '81',
                                          '90'],
                                         '81')

# Merge Sort
Q1_merge = create_multipleChoice_widget('Sie sortieren die gegebene Liste a Merge-Sort-Algorithmus. Wie oft müssen Sie die Liste aufteilen?',
                                         ['zweimal',
                                          'dreimal',
                                          'viermal',
                                          'fünfmal'],
                                         'viermal')
Q2_merge = create_multipleChoice_widget('Wie heisst das Konzept hinter dem Merge-Sort-Algorithmus?',
                                         ['Suche und Ordne',
                                          'Suche und Finde',
                                          'Teile und Gewinne',
                                          'Teile und Herrsche'],
                                         'Teile und Herrsche')
Q2_merge = create_multipleChoice_widget('Wie heisst das Konzept hinter dem Merge-Sort-Algorithmus?',
                                         ['Suche und Ordne',
                                          'Suche und Finde',
                                          'Teile und Finde',
                                          'Teile und Herrsche'],
                                         'Teile und Herrsche')
Q3_merge = create_multipleChoice_widget('Sie sortieren eine Liste mit dem Merge-Sort-Algorithmus und mit dem Insertion-Sort-Algorithmus und der Insertion-Sort-Algorithmus ist schneller. Was können Sie über die zu sortierende Liste aussagen?',
                                         ['Sie ist fast sortiert.',
                                          'Sie ist fast verkehrt herum sortiert.',
                                          'Sie ist zufällig sortiert.',
                                          'Es ist keine Aussage möglich.'],
                                         'Sie ist fast sortiert.')
Q4_merge = create_multipleChoice_widget('Sie sortieren eine Liste mit dem Merge-Sort-Algorithmus. Was können Sie erwarten?',
                                         ['Es wird vergleichsweise lange dauern, bis die Liste sortiert ist.',
                                          'Es wird möglicherweise vergleichsweise lange dauern, bis die Liste sortiert ist.',
                                          'Es wird möglicherweise vergleichsweise kurz dauern, bis die Liste sortiert ist.',
                                          'Es wird vergleichsweise kurz dauern, bis die Liste sortiert ist.'],
                                         'Es wird vergleichsweise kurz dauern, bis die Liste sortiert ist.')
Q5_merge = create_multipleChoice_widget('Der Merge-Sort-Algorithmus hat seinen Namen vom Zusammenfügen von Listen. Wenn Sie die Listen zusammenfügen, werden diese immer länger. Wieviele verschiedene Listenlängen beobachten Sie, wenn Sie eine Liste sortieren, die 32 Elemente enthält?',
                                         ['Das kann man nicht sagen.',
                                          '6',
                                          '5',
                                          '4'],
                                         '5')
