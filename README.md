# Python Memory Quest

Play: https://xgsoxshazam.github.io/PythonMemoryQuest/

A browser-based Python learning game with 9 boss levels and 12 challenges per level (108 total). Python runs in an isolated Pyodide module worker.

## Dragon battles

- Base attacks deal 10 damage per newly solved challenge to a 120 HP dragon. Equipment increases attack damage.
- A wrong answer initially costs 8 HP. Armor reduces that loss; the hero starts with 100 maximum HP.
- At zero HP, use **Revive hero** to restore health without losing completed challenges or XP.
- Complete all 12 distinct challenges to earn an equipment upgrade or unlock a combat skill and advance.
- Unlocked skills charge from six new challenge completions. Use the Cast button for bonus boss damage. Charge persists across levels and revival; repeats and reviews do not charge it.
- Staff upgrades increase attack damage, robes reduce HP loss, and the Heartstone Charm adds maximum HP. Bonus damage can defeat a dragon early; finish the remaining challenges to earn the level reward.
- Repeating completed challenges animates practice attacks without extra boss damage or XP. Review Arena does not cost HP.
- HP, course progress, XP, and review schedules are saved in this browser. Previously completed challenges remain credited when the course expands.
- Motion effects respect the system's reduced-motion preference.

## Run locally

From the repository directory, run `python -m http.server 8765`, then visit http://localhost:8765/. Opening index.html directly as a file cannot load the worker. An internet connection is needed to load the pinned Pyodide runtime from jsDelivr.

GitHub Pages serves the repository root on `main`. No server-side Python or build step is required.
