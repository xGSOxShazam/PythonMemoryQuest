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


## Version 2 adventure

Nine walkable regions each have 12 Python encounters. Use arrow keys/WASD while the map is focused, the movement buttons, or select an available encounter. Cleared encounters remain available for practice; later encounters unlock in order. The final encounter in each region is a dragon. Normal correct answers deal weapon damage; the final boss receives a triple-damage finishing attack. Spells can soften enemies before solving, but only a correct Python answer opens the next route.

The Backpack shows owned and locked equipment, with staff, robe, and charm slots. New rewards auto-equip once; players can switch back to older items. Storm Staff provides +5 attack and Dragonplate Robe +4 armor, retaining the totals from Version 1 when upgraded. Skills still charge after six newly completed challenges; practice and reviews do not charge them. Progress backup download/restore is available in the Backpack.

## Restore Version 1

The exact pre-adventure release is preserved at commit `6a485fc2673d49ccabd896d501c38e53b0335c31` on the `version-1` branch. Do not change that branch.

Open **Actions → Publish saved game version → Run workflow**, select **version-1**, and run it to republish the original game. Select **main** to republish the current game. This changes the deployed site without deleting newer source. Future pushes to main publish the current game again through the normal Pages build.

For a permanent code rollback, create a new commit on main restoring the Version 1 tree, preserving Git history. Browser progress is separate: the first Version 2 load saves a one-time copy under `pythonMemoryQuestVersion1State` and keeps the existing active progress key. Back up progress from the Backpack before resetting or changing devices.


## Guided adventure (Version 3)

Every encounter now has a **Learn → Try safely → Battle** flow. Professor Py explains the concept in plain language, provides a worked example with narrated steps, and opens an editable real-Python training camp. A practice check gives explanations on wrong answers and unlocks battle on a correct answer. Training never awards battle XP or costs hero HP. Completed encounters remain available for practice; lessons can be revisited without losing the current battle code.

There are 108 guided encounters across nine regions, supported by 47 worked examples. Lessons teach assignment, text and numbers, decisions, collections, loops, functions, dictionary records, exceptions, and objects. Supplied battle variables are visible, and mistake help explains common Python errors.

The final encounter is now the **Code Dragon** capstone: implement a Hero class, a safe damage parser, and a fight function that combines loops, decisions, list inputs, dictionary updates, and printed results. Starter code provides the structure without solving the task. Validation checks victory, surviving dragons, invalid text, nonnegative HP, stopping when the hero falls, empty attacks, and the expected printed result. Existing completion for the old final exercise is reopened for this new capstone while XP and other completion records are preserved.

The pre-teaching game is saved on branch **version-2** at commit `65f79c42c06e660b346fb7551da599ddbe53abc9`. The manual **Publish saved game version** workflow supports `version-1`, `version-2`, and `main`.
