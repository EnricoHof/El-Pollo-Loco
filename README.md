# El Pollo Loco 🌵

Ein 2D-Jump-and-Run-Spiel im Western-/Mexiko-Stil. Steuere Pepe durch die Wüste,
sammle Münzen und Salsa-Flaschen, besiege Hühner und stelle dich am Ende dem
Endboss – dem riesigen verrückten Huhn.

Entstanden als Abgabeprojekt im Rahmen einer Weiterbildung zur Vertiefung von
objektorientiertem JavaScript und der Arbeit mit dem HTML5-Canvas.

## 🎮 Spielen

1. Auf **Spiel starten** klicken.
2. Pepe durch das Level bewegen, Gegner besiegen und den Endboss erledigen.
3. Das Spiel ist gewonnen, wenn der Endboss besiegt ist – und verloren, wenn Pepes
   Leben aufgebraucht ist.

### Steuerung

| Taste              | Aktion           |
| ------------------ | ---------------- |
| ◀ / ▶ (Pfeiltasten) | Laufen           |
| ▲ / Leertaste       | Springen         |
| D                  | Flasche werfen   |

Auf Touch-Geräten (Tablet/Handy im Querformat) erscheinen zusätzlich
On-Screen-Buttons für die Steuerung.

### Features

- Durchgehend animierter Charakter (Laufen, Springen, Idle, Schlafen, Verletzt)
- Mehrere Gegner plus stärkerer Endboss mit eigener Lebensanzeige
- Münzen und Flaschen einsammeln, Flaschen auf Gegner werfen
- Status-Bars für Leben, Flaschen und Münzen
- Hintergrundmusik und Soundeffekte, stummschaltbar (im Local Storage gespeichert)
- Start- und Endscreen mit Neustart ohne Seiten-Reload
- Vollbildmodus und responsive Touch-Steuerung für mobile Geräte

## 🛠️ Tech-Stack

- **HTML5** – Struktur und `<canvas>` fürs Rendering
- **CSS3** – Layout, responsive Design, lokal eingebundene Schriftart
- **Vanilla JavaScript (ES6+)** – Spiellogik, objektorientiert mit Klassen
  und Vererbung (`MovableObject` als Superklasse)

Es werden bewusst **keine Frameworks oder Bibliotheken** verwendet.

## 📁 Projektstruktur

```
El-Pollo-Loco/
├── index.html          # Einstiegsseite mit Canvas
├── impressum.html      # Impressum
├── styles.css          # Styles
├── js/
│   └── game.js         # Initialisierung, Steuerung, Sound, Screens
├── models/             # Spielklassen (eine Klasse pro Datei)
├── img/                # Grafiken
├── audio/              # Sounds
└── fonts/              # Lokale Schriftart
```

## 🚀 Lokal starten

Das Projekt benötigt keinen Build-Schritt. Es genügt, `index.html` über einen
lokalen Webserver (z. B. MAMP/XAMPP oder die Live-Server-Erweiterung) zu öffnen.
