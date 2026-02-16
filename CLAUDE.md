# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

University fine art coursework — an interactive word-selection test that critiques how Standard English is privileged over Bajan Creole / BBE expressions. Built as vanilla HTML/CSS/JavaScript with no build tools, frameworks, or dependencies. Retro terminal / Blue Screen of Death aesthetic using VT323 Google Font.

## Running the Project

Open `index.html` directly in a browser (or use VS Code Live Server). No build step, dev server, or package manager. Note: parent directory names contain trailing spaces (`UNIT9 /`) which require quoting in terminal commands.

## Architecture

All source files are at the root of `PoE-V1/`:

- **index.html** — Entry point. Typewriter heading, white-bordered image container, 4 word choice cells, Reset/Submit buttons, two modal overlays.
- **main.js** — All application logic: participant ID prompt, typewriter animation, single-select cell interaction, validation, modal display, console data logging.
- **styles.css** — Full page #0026ff blue, VT323 terminal font, 7px white border image box, word cell grid, 3px outline buttons, modal overlay styles.
- **script.js** — Old V1 backup file. Not loaded by index.html.
- **IMAGES/** — Symbol PNG files from V1. Image container in V2 is empty by default — add images manually.

## Application Flow (main.js)

1. **Page load** — Prompts user for Participant ID (stored for console logging). Starts typewriter animation.
2. **Typewriter** — Types "PLEASE USE APPROPRIATE WORDS TO DESCRIBE THE IMAGE BELOW..." character by character. Clears and re-types every 1 minute.
3. **Cell selection** — 4 word options: GIRL, GRL, GURL, GYAL. Only one can be selected at a time (single-select). Selected cell gets white border via `.selected` class.
4. **Reset** — Clears selection, removes `.selected` from all cells.
5. **Submit** — Does nothing if no option selected. If "GIRL" (Standard English): shows colonial critique modal. If "GRL"/"GURL"/"GYAL": shows incorrect feedback modal.
6. **Console logging** — Each submission logs: Participant ID, selected word, whether it was Standard English (true/false), ISO timestamp.

## Key Implementation Details

- Word options stored in `data-word` attributes on each `.cell` div.
- Two separate modal overlays (`#correct-modal` and `#incorrect-modal`) toggled via `.active` class.
- Modal close buttons use `.closest('.modal-overlay')` to find and hide their parent overlay.
- VT323 font loaded via Google Fonts CDN link in HTML head.
- Typewriter uses recursive `setTimeout` — `typeText(charIndex)` calls itself with `charIndex + 1`.

## Git Branches

- **Original branch** — V1 code (4x6 symbol grid with shuffled images).
- **version2 branch** — V2 word-selection test (current working code).

## Workflow Rules

1. **Think through the problem** — Analyse the problem before generating any code.
2. **Read the code base** — Review existing code to understand the context before making changes.
3. **Write a plan** — Create a checklist of tasks in a `task.todo.md` file.
4. **Manual verification** — Ask for approval before executing the plan.
5. **Mark completed tasks** — Once tasks are done, mark them off in the checklist.
6. **Add a review section** — At the end, include a summary of changes in the `task.todo.md` file.
7. **Structured approach** — Break tasks down into smaller, manageable steps.

## Original V1 Bugs (fixed on original branch)

These were the bugs in the original V1 code before they were corrected:

1. `document.getElement('div')` should be `document.createElement('div')`
2. `selectedSequence.lenght` typo — should be `.length`
3. `index` variable used without being defined — should be `cell.dataset.index`
4. HTML uses `id="submit"` but main.js queries `id="submit-btn"` — ID mismatch
5. No `reset()` function was defined despite being referenced by the Reset button
