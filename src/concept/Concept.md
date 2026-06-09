
# 🎮 Angular Game Collection Architecture

This project is a **multi-game Angular arcade** where each game lives on its own route/page.
Each game is fully independent, but shares core systems like input, stats, and assets.

---

# 🧭 High-Level Idea

- Angular handles **pages & routing**
- Each game is a **self-contained canvas-based mini-engine**
- Shared services provide **input, stats, and assets**
- Games do NOT interfere with each other

---

# 🗺️ App Structure

```
/ (Home)
├── /collector → Falling item collector game
├── /snake → Snake game
├── /memory → Memory game
└── /stats → Global statistics page
```

---

# 📁 Project Structure

```
src/app/

core/
├── engine/              # optional reusable game loop helpers
├── input/               # keyboard input service
├── assets/              # sprite loading
├── services/
│   ├── stats.service.ts
│   ├── audio.service.ts
│   └── asset.service.ts
pages/
├── home/
├── collector/
│   ├── collector-game.component.ts
│   ├── collector-game.ts
│   ├── entities/
│   └── systems/
│
├── snake/
│   ├── snake-game.component.ts
│   ├── snake-game.ts
│   └── entities/
│
├── stats/
shared/
├── ui/
├── buttons/
└── components/

```
