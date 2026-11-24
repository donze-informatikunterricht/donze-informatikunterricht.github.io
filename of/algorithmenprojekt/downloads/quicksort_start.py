"""Projekt 7: Vorgegebener iterativer Code zum Untersuchen.

Lesen Sie den Code vor Meilenstein 1. Spielen Sie eine kleine Eingabe von
Hand durch. Welche Aufgaben hält offene_teillisten fest? Weshalb sind
Reihenfolge von append und pop sowie die Abbruchfälle wichtig?
Der Stapel ist eine Python-Liste; pop() entnimmt den zuletzt angehängten Teil.
"""

def quicksort(liste):
    offene_teillisten = [liste[:]]
    ergebnis = []
    while len(offene_teillisten) > 0:
        teil = offene_teillisten.pop()
        if len(teil) <= 1:
            if len(teil) == 1:
                ergebnis.append(teil[0])
        else:
            pivot = teil[0]
            kleiner = []
            groesser_gleich = []
            position = 1
            while position < len(teil):
                if teil[position] < pivot:
                    kleiner.append(teil[position])
                else:
                    groesser_gleich.append(teil[position])
                position = position + 1
            offene_teillisten.append(groesser_gleich)
            offene_teillisten.append([pivot])
            offene_teillisten.append(kleiner)
    return ergebnis


print(quicksort([7, 3, 9, 2, 5]))
