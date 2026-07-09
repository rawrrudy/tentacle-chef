# 🐙 Tentacle Chef

> A fast-paced pixel-art cooking game where you command a multitasking octopus chef to prepare, cook, and serve meals before time runs out.

<p align="center">
  <img src="assets/screenshots/banner.png" width="900"/>
</p>

---

## 🍽️ Overview

Tentacle Chef is a 2D pixel-art cooking game inspired by fast-paced kitchen management games such as **Overcooked**. Players take control of an octopus chef capable of controlling multiple tentacles at once, racing against the clock to fulfill customer orders and progress through increasingly challenging days.

Every completed order rewards money, while each new day raises the difficulty by increasing customer demand and financial targets. The game combines strategic movement, time management, and satisfying visual feedback into a lightweight browser experience.

---

## ✨ Features

- 🐙 Play as a pixel-art octopus chef
- 🍅 Collect, chop, cook and serve ingredients
- 👨 Dynamic customer queue with speech bubbles
- ⏱️ Timed gameplay and progressive day system
- 💰 Increasing money and customer goals
- 🌫️ Steam particle effects and animated kitchen
- 🎵 Background music and sound effects
- 🎮 Smooth movement with collision detection
- 📈 Infinite day progression

---

## 📸 Screenshots

### Gameplay

![Gameplay](assets/screenshots/gameplay.png)

### Serving Customers

![Serving](assets/screenshots/serving.png)

### Day Complete Screen

![Day Complete](assets/screenshots/day-complete.png)

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Language | TypeScript |
| Frontend | HTML5 Canvas |
| Build Tool | Vite |
| Graphics | Pixel Art (Piskel) |
| Audio | HTML5 Audio API |
| Version Control | Git + GitHub |
| Deployment | Vercel |

---

# 💡 Motivation

Managing a busy kitchen requires quick thinking, planning, and multitasking.

We wanted to explore what that experience would feel like if the chef wasn't human—but an octopus with multiple tentacles capable of handling several cooking tasks simultaneously.

Tentacle Chef was created to combine charming pixel-art visuals with satisfying kitchen gameplay while remaining lightweight enough to run directly inside any modern web browser.

---

# ⚙️ How It Works

The gameplay revolves around a simple cooking loop:

1. Customers join the queue and place orders.
2. The player moves around the kitchen.
3. Tentacles automatically prepare ingredients at nearby stations.
4. Ingredients progress through:
   - Ingredients
   - Chopping Board
   - Stove
   - Serving Counter
5. Successfully serving dishes rewards money.
6. Completing the day's objectives unlocks the next day with higher difficulty.

Throughout gameplay the system manages:

- Customer queue
- Order timers
- Inventory
- Cooking stations
- Steam particles
- Floating reward animations
- Dynamic HUD
- Progressive difficulty scaling

---

# 🎮 Controls

| Key | Action |
|-----|--------|
| W A S D | Move |
| ENTER | Start Next Day |
| R | Restart after Time Up |

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/rawrrudy/tentacle-chef.git
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 📂 Project Structure

```
src/
├── core/
├── entities/
├── systems/
├── world/
├── effects/
├── assets/
└── utils/
```

---

# 🌱 Future Improvements

- Multiple recipes
- New ingredients
- Kitchen upgrades
- Boss rush mode
- Power-ups
- Local multiplayer
- Procedurally generated kitchens

---

# 👨‍💻 Developed By

**Rudra Sundgikar**

Made with ❤️ using TypeScript, Canvas and lots of tentacles.
