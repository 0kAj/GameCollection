# Home Page!
ein rumlaufendes Pet bei onclick öffnet sich ein UI wo man die Farbe ändern kann und es füttern kann. 
über dem pet sollen alle Games aufgelistet werde. Alle Arcade Games

Ganz oben soll der titel sein: GameCollection -> das soll animiert sein. und farblich wie arcade leichten.

Ambesten soll das auswahl menü in einem Arcade artigen stil gehalten sein. Also rechtecke für jedes Game mit Name drunter und bild darüber. Und am besten sind ist die Games Auswahl ein großer arcade automat

der hintergrund soll ein Wohnzimmer sein in einem Orangenen ton.

Bootstrap mit Tailwind?



## HomePage (Container Scene)
- Background
- Layout
- Router Navigation
## ArcadeGameSelectorComponent
- Grid / Arcade Maschine UI
- Game Cards
## PetComponent
- Canvas oder Sprite
- Click → opens Pet UI
## PetOverlayComponent
- Farbe ändern
- Feed Button
- simple state UI

## Structure
```text
src/app/page/home/
  home.page.ts
  home.page.html
  home.page.css

  components/
    arcade-selector/
    pet/
    pet-ui/
    arcade-title/
```
