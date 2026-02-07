# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a vanilla HTML/CSS/JavaScript web application — a grid-based interactive selection interface (V1 prototype). There are no build tools, package managers, or frameworks. It is a university fine art coursework project.

## Running the Project

Open `V1/index.html` directly in a browser. There is no build step, dev server, or dependencies to install.

## Architecture

All source code lives in the `V1/` directory:

- **index.html** — Entry point. Defines the DOM structure: a 4×6 grid container, Reset/Submit buttons, and a feedback div. Loads `main.js` only.
- **styles.css** — CSS Grid layout (4 columns × 6 rows of 100px cells). Uses flexbox for page centering. Color scheme: red background, blue container, dark red cells that turn blue when selected.
- **main.js** — Active application logic. Creates 24 grid cells dynamically, tracks user selections in a `selectedSequence` array, and validates submissions.
- **script.js** — Older duplicate of main.js. **Not loaded by index.html.** Contains slightly different button IDs and extra console.logs. Can likely be removed.

## Known Bugs in Current Code

The code has several errors that prevent it from running:

1. `document.getElement('div')` should be `document.createElement('div')` (main.js and script.js)
2. `selectedSequence.lenght` typo — should be `.length`
3. `index` variable used without being defined — should be `cell.dataset.index`
4. HTML uses `id="submit"` but main.js queries `id="submit-btn"` — ID mismatch
5. No `reset()` function is defined despite being referenced by the Reset button
