# Python Memory Quest

Play: https://xgsoxshazam.github.io/PythonMemoryQuest/

A browser-based Python learning game with 9 boss levels and 12 challenges per level (108 total). Python runs in an isolated Pyodide module worker.

## Dragon battles

- Each newly solved challenge deals 10 damage to the level dragon (120 HP).
- A wrong answer costs your hero 8 HP (100 HP per level).
- At zero HP, use **Revive hero** to restore health without losing completed challenges or XP.
- Solve all 12 distinct challenges to defeat the dragon and unlock the next level.
- Repeating completed challenges animates practice attacks without extra boss damage or XP. Review Arena does not cost HP.
- HP, course progress, XP, and review schedules are saved in this browser. Previously completed challenges remain credited when the course expands.
- Motion effects respect the system's reduced-motion preference.

## Run locally

From the repository directory, run `python -m http.server 8765`, then visit http://localhost:8765/. Opening index.html directly as a file cannot load the worker. An internet connection is needed to load the pinned Pyodide runtime from jsDelivr.

GitHub Pages serves the repository root on `main`. No server-side Python or build step is required.
