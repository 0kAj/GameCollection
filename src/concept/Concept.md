# Angular Game Collection Concept

This project is a small Angular game collection. Each game should live on its own route and keep its own game logic, objects, styles, and assets separated from the other games.

## Core Rules

- Every class and interface belongs in its own file.
- Shared engine code lives in `src/app/core`.
- Game-specific code lives in the matching folder under `src/app/page`.
- Canvas games use the shared `GameEngine` loop.
- Game objects should extend `GameObject` when they have a position, size, and sprite.
- Assets must be placed under `src/app/assets` and copied through `angular.json`.
- A game page should be playable immediately. Do not use landing-page or MVP explanation text inside the game screen.

## Current Routes

```text
/collector
```

The default route redirects to `/collector`.

## Current Project Structure

```text
src/app/
├── core/
│   ├── assets/
│   │   └── image-loader.ts
│   ├── engine/
│   │   ├── GameEngine.ts
│   │   ├── GameObject.ts
│   │   └── IGame.ts
│   └── input/
│       ├── KeyboardInput.ts
│       └── key-listener-registration.ts
│
├── page/
│   └── collector-game/
│       ├── collector-game.html
│       ├── collector-game.css
│       ├── collector-game.ts
│       ├── logic/
│       │   ├── collector-game.constants.ts
│       │   └── collector-game.logic.ts
│       ├── models/
│       │   ├── board-size.ts
│       │   └── bounds.ts
│       ├── objects/
│       │   ├── collectible.ts
│       │   └── player.ts
│       └── utils/
│           └── clamp.ts
│
└── assets/
    ├── food/
    ├── games/
    └── pets/
```

## Shared Engine

`GameEngine` owns the animation loop:

- `load(game)` replaces the active game.
- `start()` starts the `requestAnimationFrame` loop.
- `stop()` stops the loop and destroys the active game.
- The engine calls `update(delta)` and `render()` on the loaded game.

`IGame` is the contract every playable game must implement:

- `start()`
- `update(delta)`
- `render()`
- optional `destroy()`

`GameObject` is the base class for sprite objects:

- position: `x`, `y`
- size: `width`, `height`
- image: `sprite`
- shared sprite rendering through `renderSprite(ctx)`

## Collector Game

The collector game is currently the first playable game.

Player:

- Uses `assets/pets/Mouse.png`
- Moves with WASD or arrow keys
- Is clamped inside the visible canvas board

Collectible:

- Uses `assets/food/apple.png`
- Spawns away from the player
- Shrinks over time
- Respawns at full size when collected
- Ends the game when it vanishes

The canvas fills the visible screen. The actual canvas width and height are updated from the browser layout, so the full visible board is playable, not only visually stretched.

## Asset Handling

Images are stored in `src/app/assets`.

`angular.json` must include:

```json
{
  "glob": "**/*",
  "input": "src/app/assets",
  "output": "assets"
}
```

Use relative asset URLs like:

```text
assets/pets/Mouse.png
assets/food/apple.png
```

This keeps assets working with Angular's base href and deployment paths.

## Adding Another Game

For a new game:

1. Add a new folder under `src/app/page`.
2. Create a standalone Angular page component.
3. Create one logic class implementing `IGame`.
4. Put game objects in an `objects` folder.
5. Put interfaces in a `models` folder.
6. Put constants in a `logic` constants file.
7. Add the route in `app.routes.ts`.
8. Keep the first screen as the playable game.
