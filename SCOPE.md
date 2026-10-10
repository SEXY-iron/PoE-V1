# PoE-V1 — Scope Document

**Last updated:** 2026-10-08

## 1. What this project is

PoE is the empirical/practical component of the dissertation "Language As A Technology" (LAAT), itself a SPIF-funded project (£4.5k). PoE-V1 (this repo) has a ruleset — it tests colonial linguistic bias through constrained word/ideogram choices, with a critique shown depending on what's selected. PoE-V2 has no ruleset — the contrast between the two IS the research argument, made tangible through interaction rather than just described.

Built as vanilla HTML/CSS/JS, no build tools or frameworks. Designed to run both in-browser and on physical Degree Show hardware (Seeed XIAO SAMD21 Arduino, 4 push buttons emulating a USB keyboard sending keys 1-4).

## 2. Current build status

Three phases, each with its own words/proverbs/images, a countdown timer, a "Why?" reasoning step, dynamic critique text, and a completion survey at the end. Fully playable via three independent input paths: the physical controller, a real keyboard, or mouse/touch.

**Last shipped**: commit `3796a7a` ("NEWDAY", 2026-10-05).

## 3. Known issues — resolved

| # | Issue | Fixed in |
|---|---|---|
| 1 | Phase 1/2 "How to Play" close button had a duplicate `class` attribute, losing its styling | earlier session |
| 2 | Phase 3 "How to Play" close button was missing the `modal-close` class entirely | commit `810755d`-adjacent work |
| 3 | Mouse/touch users could select a word (Phase 1/2/3) but got stuck on the "Why?" popup and completion survey — `.why-cell`/`.completion-cell` had no `click` listeners, only keyboard selection | commit `3796a7a` |
| 4 | Keyboard/controller input entirely broken — `lastControllerKey`, `lastControllerTime`, `DOUBLE_PRESS_MS` declarations accidentally deleted and replaced with a stray `4` on commit `810755d`, broke every key 1-4 press outside modals for 17 days before being caught | commit `3796a7a` |

## 4. Known issues — open

| # | Issue | Severity | Notes |
|---|---|---|---|
| 1 | Phase 3's "selected" cell highlight (`rgb(0, 60, 255)` border) is nearly the same colour as the Phase 3 cell background (`#0026ff`) — low contrast, may be hard for a player to see what's selected | Medium | Flagged 2026-09, never actioned. [styles.css:770-782](styles.css#L770-L782) |
| 2 | Stray backtick characters on [main.js:458](main.js#L458), likely an accidental paste | Low | Doesn't break anything, just needs cleanup |

## 5. What's NOT in scope right now

*(needs your input — what are you explicitly NOT trying to fix/build before the next milestone?)*

## 6. Next priorities

*(needs your input — rank these, or add what's missing: more bug-hunting via playtesting? New features? Visual/content polish? Prepping for another exhibition?)*

## 7. Target / deadline

*(needs your input — is there a specific date this needs to be in a certain state by?)*
