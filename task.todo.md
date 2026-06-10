# TASK — Controller Input (SAMD21 HID → Game)
**Date:** 29 May 2026  
**Goal:** Map physical button keypresses (1, 2, 3, 4) from the Seeed XIAO SAMD21 HID controller to the 4 answer cells in the game.

---

## Plan

- [x] **1. Add keydown listener in `main.js`** — listen for `e.key === '1'` through `'4'`
- [x] **2. Guard conditions** — do nothing if:
  - Game is paused (`isPaused`)
  - Focus is in a text field (`e.target.matches('input, textarea')`)
  - Any modal overlay is currently open (game-over, why, critique, transition, completion, restart, how-to-play, how-to-play-p3)
- [x] **3. Selection logic** — map key index to cell index (1→0, 2→1, 3→2, 4→3), clear `.selected` from all cells, add `.selected` to target cell, set `selectedWord`, call `stopProverbCycle()` (mirrors existing click logic exactly)
- [x] **4. Console log** — log `'Controller selected: [word]'` for debugging during install

---

## Placement in `main.js`
Added new `keydown` listener directly after the existing Space/pause listener (~line 263). Keeps controller logic self-contained and separate from pause logic.

---

## Review
Added ~20 lines to `main.js` only. No HTML or CSS changes needed.

- Physical buttons 1–4 now select the 4 word/symbol cells, identical to clicking them with a mouse
- Guards prevent accidental triggers during modals, pause state, and while typing in the Why textarea
- Space bar pause and all keyboard/mouse interactions are completely unchanged
- Console logs `Controller selected: [word]` for easy debugging at the degree show install
