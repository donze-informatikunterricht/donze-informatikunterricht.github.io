import matplotlib.pyplot as plt # PyPlot: Modul für Visualisierungen (Plots)
import numpy as np # NumPy: Modul für numerische Berechnungen
from IPython import display # Jupyter-Notebook-spezifisches Modul

# In der Anacondadistribution ist matplotlib bereits vorinstalliert. 
# Falls Ihnen matplotlib oder numpy fehlen, können Sie diese wie folgt installieren, 
# kommentieren Sie die folgende Zeile ein (numpy wird mit matplotlib mitinstalliert):
# pip install matplotlib

def liste_darstellen(liste, titel = "Säulendiagramm", sekunden_warten = 0.2):
    
    # Den Output der aktuellen Zelle (des Jupyter Notebooks) löschen
    # parameter wait=True: warten, bis der neue Output bereitsteht
    display.clear_output(wait=True)
        
    # Balkenindex (x-Koordinaten der Balken)
    anzahl_elemente=len(liste)
    bar_index = np.arange(anzahl_elemente)
    # Balkenbreite (1 bedeutet bis zum nächsten Balken)
    bar_width = 0.5

    # Titel
    plt.title(titel)

    # Keine besondere Beschriftung der x- und y-Achsen:
    # plt.xticks und plt.yticks nicht definieren

    # Balkendiagramm
    plt.bar(bar_index, height=liste, width=bar_width, color='blue')

    # Plot anzeigen 
    plt.show()
    
    # kurz warten, weil sonst nichts sichtbar
    plt.pause(sekunden_warten)

# Suchalgorithmen
# Lineare Suche: Hier soll der jeweils aktuelle Wert (Position links) rot dargestellt werden
# binäre Suche: Hier soll der Bereich von links bis und mit rechts dargestellt werden und das mittlere Element (abgerundet) grün
def liste_darstellen_suche(liste, links, rechts=-1, titel = "Säulendiagramm", sekunden_warten = 0.2):
    # Den Output der aktuellen Zelle (des Jupyter Notebooks) löschen
    # parameter wait=True: warten, bis der neue Output bereitsteht
    display.clear_output(wait=True)
        
    # Balkenindex (x-Koordinaten der Balken)
    anzahl_elemente=len(liste)
    bar_index = np.arange(anzahl_elemente)
    # Balkenbreite (1 bedeutet bis zum nächsten Balken)
    bar_width = 0.5

    # Titel
    plt.title(titel)

    # Keine besondere Beschriftung der x- und y-Achsen:
    # plt.xticks und plt.yticks nicht definieren

    # hervorgehobene Elemente in eine Nullerliste schreiben
    zweite_liste = [0 for x in range(len(liste))]
    dritte_liste = [0 for x in range(len(liste))]
    if rechts >= 0:
        zweite_liste[links:rechts+1] = liste[links:rechts+1]
        dritte_liste[(links+rechts)//2] = liste[(links+rechts)//2]
    else:
        zweite_liste[links] = liste[links]
       
    # Balkendiagramm
    plt.bar(bar_index, height=liste, width=bar_width, color='blue')
    plt.bar(bar_index, height=zweite_liste, width=bar_width, color='red')
    plt.bar(bar_index, height=dritte_liste, width=bar_width, color='green')

    # Plot anzeigen 
    plt.show()
    
    # kurz warten, weil sonst nichts sichtbar
    plt.pause(sekunden_warten)


