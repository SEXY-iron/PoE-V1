// ============================================================
// V2 WORD SELECTION TEST — MAIN LOGIC
// ============================================================

// --- DOM ELEMENT REFERENCES ---
// Get references to all the HTML elements we need to interact with

// The 4 word choice cells (GIRL, GRL, GURL, GYAL)
const cells = document.querySelectorAll('.cell');

// Reset and Submit buttons
const resetBtn = document.getElementById('reset');
const submitBtn = document.getElementById('submit');

// The typewriter text container at the top of the page
const typewriterEl = document.getElementById('typewriter');

// The two modal overlays — one for "correct" (colonial critique), one for "incorrect"
const correctModal = document.getElementById('correct-modal');
const incorrectModal = document.getElementById('incorrect-modal');

// All modal close buttons (both modals have one)
const closeButtons = document.querySelectorAll('.modal-close');


// --- PARTICIPANT ID ---
// Prompt the user for their participant ID when the page loads.
// This ID is logged with every submission for data tracking.
let participantId = prompt('Please enter your Participant ID:');

// If the user cancels or enters nothing, assign a default ID
if (!participantId || participantId.trim() === '') {
    participantId = 'UNKNOWN';
}
console.log('Participant ID:', participantId);


// --- SELECTED WORD TRACKING ---
// Stores which word the user has currently selected (null = nothing selected)
let selectedWord = null;


// --- TYPEWRITER ANIMATION ---
// The full text that gets typed out character by character at the top of the page
const typewriterText = 'PLEASE USE APPROPRIATE WORDS TO DESCRIBE THE IMAGE BELOW...';

// Speed in milliseconds between each character appearing
const typeSpeed = 50;

// How long to wait (in ms) after finishing before clearing and restarting (1 minute)
const restartDelay = 10000;

// Reference to the current timeout so we can cancel it when restarting
let typewriterTimeout = null;

// Types the text one character at a time into the typewriter element.
// charIndex tracks which character we're up to in the string.
function typeText(charIndex) {
    if (charIndex < typewriterText.length) {
        // Add the next character to the element's text content
        typewriterEl.textContent = typewriterText.substring(0, charIndex + 1);

        // Schedule the next character after a short delay
        typewriterTimeout = setTimeout(() => typeText(charIndex + 1), typeSpeed);
    } else {
        // Finished typing the full sentence — wait 1 minute then restart
        typewriterTimeout = setTimeout(() => {
            typewriterEl.textContent = '';
            typeText(0);
        }, restartDelay);
    }
}

// Start the typewriter animation immediately when the page loads
typeText(0);


// --- CELL SELECTION (SINGLE SELECT) ---
// Only one cell can be selected at a time (like radio buttons).
// Clicking a cell selects it and deselects any previously selected cell.

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        // Remove 'selected' class from ALL cells first (deselect everything)
        cells.forEach(c => c.classList.remove('selected'));

        // Add 'selected' class to the clicked cell
        cell.classList.add('selected');

        // Store the word from the cell's data-word attribute (e.g. "GIRL", "GYAL")
        selectedWord = cell.dataset.word;

        console.log('Selected:', selectedWord);
    });
});


// --- RESET BUTTON ---
// Clears the current selection — removes highlight from all cells
// and resets the selectedWord variable to null.
resetBtn.addEventListener('click', () => {
    // Remove 'selected' class from all cells
    cells.forEach(c => c.classList.remove('selected'));

    // Clear the stored selection
    selectedWord = null;

    console.log('Selection reset');
});


// --- SUBMIT BUTTON ---
// Validates the user's selection and shows the appropriate modal popup.
// "GIRL" (Standard English) = shows the colonial critique modal.
// "GRL", "GURL", "GYAL" = shows the incorrect feedback modal.
// If nothing is selected, the submit does nothing (user must pick one).
submitBtn.addEventListener('click', () => {
    // If no cell is selected, do nothing — user must select an option
    if (!selectedWord) {
        return;
    }

    // Check if the selected word is the "correct" Standard English answer
    const isCorrect = selectedWord === 'GIRL';

    // Log the submission data to the console for tracking
    console.log('--- SUBMISSION ---');
    console.log('Participant ID:', participantId);
    console.log('Selected word:', selectedWord);
    console.log('Standard English (correct):', isCorrect);
    console.log('Timestamp:', new Date().toISOString());
    console.log('------------------');

    // Show the appropriate modal based on the answer
    if (isCorrect) {
        // "GIRL" selected — show colonial critique modal
        correctModal.classList.add('active');
    } else {
        // "GRL", "GURL", or "GYAL" selected — show incorrect feedback modal
        incorrectModal.classList.add('active');
    }
});


// --- MODAL CLOSE BUTTONS ---
// Both modals have a close button. When clicked, hide the modal overlay
// by removing the 'active' class from the parent modal-overlay element.
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Walk up to the parent .modal-overlay and remove the 'active' class
        btn.closest('.modal-overlay').classList.remove('active');
    });
});
