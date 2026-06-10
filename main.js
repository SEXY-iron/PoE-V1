// ============================================================
// V2 WORD SELECTION TEST — MAIN LOGIC
// ============================================================

// --- DOM ELEMENT REFERENCES ---
const resetBtn = document.getElementById('reset');
const submitBtn = document.getElementById('submit');
const typewriterEl = document.getElementById('typewriter');
const imageContainer = document.getElementById('image-container');
const choicesContainer = document.getElementById('choices');
const controlsContainer = document.getElementById('controls');
const transitionModal = document.getElementById('transition-modal');
const transitionText = document.getElementById('transition-text');
const transitionEnterBtn = document.getElementById('transition-enter');
const critiqueModal = document.getElementById('critique-modal');
const critiqueBody = document.getElementById('critique-body');
const critiqueCloseBtn = document.getElementById('critique-close');
const whyModal = document.getElementById('why-modal');
const whyQuestion = document.getElementById('why-question');
const whySubmitBtn = document.getElementById('why-submit');
const whyCloseBtn = document.getElementById('why-close');


// Key symbols shown in each cell (keys 1–4 in order)
const KEY_SYMBOLS = ['./IMAGES/3.png', './IMAGES/4.png', './IMAGES/2.png', './IMAGES/1.png'];

// --- PHASE DATA ---
const phases = [
    {
        images: ['./IMAGES/SYM.8.png', './IMAGES/PMINISTER.jpg'],
        words: ['WOMAN', 'GRL', 'GURL', 'BIG GYAL'],
        correct: 'WOMAN',
        typewriter: 'PLEASE USE APPROPRIATE WORDS TO DESCRIBE THE IMAGE BELOW...',
        showTransition: true,
        transitionText: 'PRESS KEY 2 TO CONTINUE'
    },
    {
        images: ['./IMAGES/SYM.7.png', './IMAGES/WINDRUSH.jpg'],
        words: ['YUTES', 'MANDEM', 'A GROUP OF GENTLEMEN', 'BWOY'],
        correct: 'A GROUP OF GENTLEMEN',
        showTransition: true,
        transitionText: 'PRESS KEY 2 TO MOVE ON TO THE NEXT STAGE',
        typewriter: 'PLEASE USE APPROPRIATE WORDS TO DESCRIBE THE IMAGE BELOW...'
    },
    {
        proverbs: [
            { text: '"THOSE WHO<br>DO NOT<br>LISTEN...<br>WILL FEEL"', bg: '#000000', textColor: '#c90808' },
            { text: '"De devil does<br>find work fa<br>idle hands."', bg: '#30fc03', textColor: '#c90808' },
            { text: '"God devil does<br>find idle<br>hands"', bg: '#9d03fc', textColor: '#ffffff' },
            { text: '"Mans Bare<br>Hot Blud"', bg: '#fc6203', textColor: '#000000' }
        ],
        symbols: ['./IMAGES/SYM.7.png', './IMAGES/SYM.2.png', './IMAGES/SYM.6.png', './IMAGES/SYM.1.png'],
        correct: './IMAGES/SYM.7.png',
        typewriter: 'SELECT THE SYMBOL YOU FEEL RESONATES WITH THE PROVERB...'
    }
];
let currentPhase = 0;


// --- IMAGE CYCLING ---
let imageCycleInterval = null;
let currentImageIndex = 0;

// --- PROVERB CYCLING ---
let proverbCycleInterval = null;
let currentProverbIndex = 0;

function startProverbCycle() {
    stopProverbCycle();
    const phase = phases[currentPhase];
    if (!phase.proverbs) return;
    currentProverbIndex = 0;

    proverbCycleInterval = setInterval(() => {
        currentProverbIndex = (currentProverbIndex + 1) % phase.proverbs.length;
        const proverb = phase.proverbs[currentProverbIndex];
        const textEl = imageContainer.querySelector('.center-text');
        if (textEl) {
            textEl.innerHTML = proverb.text;
            textEl.style.color = proverb.textColor;
        }
        imageContainer.style.background = proverb.bg;
    }, 2500);
}

function stopProverbCycle() {
    if (proverbCycleInterval) {
        clearInterval(proverbCycleInterval);
        proverbCycleInterval = null;
    }
}

function startImageCycle() {
    stopImageCycle();
    const phase = phases[currentPhase];
    if (!phase.images) return;
    currentImageIndex = 0;

    if (phase.images.length > 1) {
        imageCycleInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % phase.images.length;
            const img = imageContainer.querySelector('img');
            img.src = phase.images[currentImageIndex];
        }, 2500);
    }
}

function stopImageCycle() {
    if (imageCycleInterval) {
        clearInterval(imageCycleInterval);
        imageCycleInterval = null;
    }
}

// Check URL for a phase skip parameter (e.g. ?phase=3)
const urlPhase = new URLSearchParams(window.location.search).get('phase');
if (urlPhase && parseInt(urlPhase) > 1 && parseInt(urlPhase) <= phases.length) {
    currentPhase = parseInt(urlPhase) - 1;
    loadPhase(currentPhase);
} else {
    startImageCycle();
}


// --- PARTICIPANT ID ---
const codeNames = ['SOS','AAA','OI','OK','YO','BIG','VEX','RAH','OOH','WAH','ZAP','ACE','FLY','JAM','POP','WOW','BAM','GOT','YAH','OOF','NAH','BET','FAM','UNO','AYO','MAX','ZEN','LIT','DAP','GEE'];
let participantId = codeNames[Math.floor(Math.random() * codeNames.length)] + '-' + Math.floor(Math.random() * 900 + 100);
alert('YOUR PLAYER CODE: ' + participantId);
console.log('Participant ID:', participantId);


// --- SELECTED WORD TRACKING ---
let selectedWord = null;


// --- TIMER ---
const timerBox = document.getElementById('timer-box');
const gameOverModal = document.getElementById('game-over');
const gameOverEnterBtn = document.getElementById('game-over-enter');
let timerInterval = null;
let timerSeconds = 20;

function startTimer() {
    stopTimer();
    var duration = (currentPhase === 2) ? 20 : 10;
    timerSeconds = duration;
    timerBox.textContent = timerSeconds;
    timerBox.className = 'timer-box';
    timerBox.classList.remove('hidden');

    timerInterval = setInterval(() => {
        timerSeconds--;
        timerBox.textContent = timerSeconds;

        // Update colour — thresholds scale with duration
        if (timerSeconds <= 0) {
            timerBox.className = 'timer-box black';
            stopTimer();
            triggerGameOver();
        } else if (timerSeconds <= Math.ceil(duration * 0.25)) {
            timerBox.className = 'timer-box red';
        } else if (timerSeconds <= Math.ceil(duration * 0.5)) {
            timerBox.className = 'timer-box orange';
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function triggerGameOver() {
    stopTimer();
    stopImageCycle();
    stopProverbCycle();
    clearTimeout(typewriterTimeout);
    gameOverModal.classList.add('active');

    // Auto-restart countdown
    let countdown = 4;
    const countdownEl = document.getElementById('game-over-countdown');
    countdownEl.textContent = countdown;
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            restartFromGameOver();
        }
    }, 1000);

    // If user clicks ENTER early, clear the auto countdown
    gameOverEnterBtn.onclick = () => {
        clearInterval(countdownInterval);
        restartFromGameOver();
    };
}

function restartFromGameOver() {
    gameOverModal.classList.remove('active');
    loadPhase(currentPhase);
    if (currentPhase !== 2) {
        document.getElementById('how-to-play').classList.add('active');
    }
}


// --- PAUSE ---
let isPaused = false;
let savedTimerColour = '';

function togglePause() {
    // Don't pause if a modal is open or game hasn't started
    if (gameOverModal.classList.contains('active') ||
        document.getElementById('how-to-play').classList.contains('active') ||
        document.getElementById('how-to-play-p3').classList.contains('active') ||
        whyModal.classList.contains('active') ||
        critiqueModal.classList.contains('active') ||
        transitionModal.classList.contains('active') ||
        document.getElementById('completion-modal').classList.contains('active') ||
        document.getElementById('restart-modal').classList.contains('active')) return;

    if (!isPaused) {
        isPaused = true;
        stopTimer();
        stopImageCycle();
        stopProverbCycle();
        clearTimeout(typewriterTimeout);
        savedTimerColour = timerBox.className;
        timerBox.textContent = '⏸';
    } else {
        isPaused = false;
        timerBox.className = savedTimerColour;
        timerBox.textContent = timerSeconds;
        // Resume timer from where it left off
        var duration = (currentPhase === 2) ? 20 : 10;
        timerInterval = setInterval(() => {
            timerSeconds--;
            timerBox.textContent = timerSeconds;
            if (timerSeconds <= 0) {
                timerBox.className = 'timer-box black';
                stopTimer();
                triggerGameOver();
            } else if (timerSeconds <= Math.ceil(duration * 0.25)) {
                timerBox.className = 'timer-box red';
            } else if (timerSeconds <= Math.ceil(duration * 0.5)) {
                timerBox.className = 'timer-box orange';
            }
        }, 1000);
        // Resume cycling
        if (phases[currentPhase].images) startImageCycle();
        if (phases[currentPhase].proverbs && !selectedWord) startProverbCycle();
        restartTypewriter();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        togglePause();
    }
});

// --- SAMD21 CONTROLLER INPUT (pins A0-A3 → keys 1-4) ---
let lastControllerKey = null;
let lastControllerTime = 0;
const DOUBLE_PRESS_MS = 400;

document.addEventListener('keydown', (e) => {
    if (isPaused || e.target.matches('input, textarea')) return;

    // Key 2 = universal close/continue throughout the game
    if (e.key === '2') {
        const checks = [
            ['how-to-play',       'htp-close'],
            ['how-to-play-p3',    'htp-close-p3'],
            ['transition-modal',  'transition-enter'],
            ['game-over',         'game-over-enter'],
            ['critique-modal',    'critique-close'],
            ['restart-modal',     'restart-enter'],
            ['completion-modal',  'completion-submit'],
        ];
        for (const [modalId, btnId] of checks) {
            if (document.getElementById(modalId).classList.contains('active')) {
                document.getElementById(btnId).click();
                return;
            }
        }
    }

    const modalsOpen = ['game-over', 'critique-modal', 'transition-modal',
        'completion-modal', 'restart-modal', 'how-to-play', 'how-to-play-p3']
        .some(id => document.getElementById(id).classList.contains('active'));
    if (modalsOpen) return;

    const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
    const index = keyMap[e.key];
    if (index === undefined) return;

    const now = Date.now();
    const isDoublePress = (now - lastControllerTime) < DOUBLE_PRESS_MS;

    // Why modal open — route to why cells
    if (whyModal.classList.contains('active')) {
        const whyCells = document.querySelectorAll('.why-cell');
        if (index >= whyCells.length) return;
        whyCells.forEach(c => c.classList.remove('selected'));
        whyCells[index].classList.add('selected');
        console.log('Why selected:', whyCells[index].dataset.reason);
        if (isDoublePress) {
            lastControllerKey = null;
            lastControllerTime = 0;
            whySubmitBtn.click();
        } else {
            lastControllerKey = e.key;
            lastControllerTime = now;
        }
        return;
    }

    const cells = document.querySelectorAll('.cell');
    if (index >= cells.length) return;

    cells.forEach(c => c.classList.remove('selected'));
    cells[index].classList.add('selected');
    selectedWord = cells[index].dataset.word;
    stopProverbCycle();
    console.log('Controller selected:', selectedWord);

    if (isDoublePress) {
        lastControllerKey = null;
        lastControllerTime = 0;
        submitBtn.click();
    } else {
        lastControllerKey = e.key;
        lastControllerTime = now;
    }
});


// --- TYPEWRITER ANIMATION ---
const typeSpeed = 50;
const restartDelay = 10000;
let typewriterTimeout = null;
let currentTypewriterText = phases[currentPhase].typewriter;

function typeText(charIndex) {
    if (charIndex < currentTypewriterText.length) {
        typewriterEl.textContent = currentTypewriterText.substring(0, charIndex + 1);
        typewriterTimeout = setTimeout(() => typeText(charIndex + 1), typeSpeed);
    } else {
        typewriterTimeout = setTimeout(() => {
            typewriterEl.textContent = '';
            typeText(0);
        }, restartDelay);
    }
}

function restartTypewriter() {
    clearTimeout(typewriterTimeout);
    currentTypewriterText = phases[currentPhase].typewriter;
    typewriterEl.textContent = '';
    typeText(0);
}

typeText(0);


// --- PHASE LOADING ---
function loadPhase(phaseIndex) {
    const phase = phases[phaseIndex];

    // Toggle phase-3 theme class on body
    document.body.classList.toggle('phase-3', phaseIndex === 2);

    // Show Phase 3 how-to-play popup
    if (phaseIndex === 2) {
        document.getElementById('how-to-play-p3').classList.add('active');
    }

    // Restart typewriter with this phase's text
    restartTypewriter();

    // Update the image container — proverbs, or images
    if (phase.proverbs) {
        stopImageCycle();
        const firstProverb = phase.proverbs[0];
        imageContainer.innerHTML = '<p class="center-text" style="color:' + firstProverb.textColor + '">' + firstProverb.text + '</p>';
        imageContainer.style.background = firstProverb.bg;
        startProverbCycle();
    } else {
        if (!imageContainer.querySelector('img')) {
            imageContainer.innerHTML = '<img src="" alt="Symbol">';
        }
        const img = imageContainer.querySelector('img');
        img.src = phase.images[0];
        startImageCycle();
    }

    // Clear existing cells and rebuild
    choicesContainer.innerHTML = '';
    const items = phase.symbols || phase.words;
    items.forEach(item => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.word = item;
        if (phase.symbols) {
            const symImg = document.createElement('img');
            symImg.src = item;
            symImg.alt = 'Symbol';
            cell.appendChild(symImg);
        } else {
            cell.textContent = '"' + item + '"';
        }
        choicesContainer.appendChild(cell);
    });

    attachCellListeners();
    selectedWord = null;

    // Reset timer display (timer starts when HTP closes)
    stopTimer();
    timerSeconds = 20;
    timerBox.textContent = (phaseIndex === 2) ? '15' : '10';
    timerBox.className = 'timer-box';
}

// Attaches single-select click listeners to all current .cell elements
function attachCellListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cells.forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
            selectedWord = cell.dataset.word;
            stopProverbCycle();
            console.log('Selected:', selectedWord);
        });
    });
}

// Attach listeners to the initial Phase 1 cells
attachCellListeners();


// --- RESET BUTTON ---
resetBtn.addEventListener('click', () => {
    if (isPaused) return;
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('selected'));
    selectedWord = null;
    if (phases[currentPhase].proverbs) startProverbCycle();
    console.log('Selection reset');
});


// --- SUBMIT BUTTON ---
// All phases: Submit → Why popup
submitBtn.addEventListener('click', () => {
    if (!selectedWord || isPaused) return;
    stopTimer();
    timerBox.classList.add('hidden');

    const phase = phases[currentPhase];

    // Update the why question text based on phase type
    if (phase.symbols) {
        whyQuestion.textContent = 'WHY DID YOU CHOOSE THIS SYMBOL?';
    } else {
        whyQuestion.textContent = 'WHY DID YOU CHOOSE THIS WORD?';
    }

    document.querySelectorAll('.why-cell').forEach(c => c.classList.remove('selected'));
    whyModal.classList.add('active');
});


// --- WHY POPUP SUBMIT ---
// After user explains why → show critique popup
whySubmitBtn.addEventListener('click', () => {
    const selectedWhyCell = document.querySelector('.why-cell.selected');
    if (!selectedWhyCell) return;
    const reason = selectedWhyCell.dataset.reason;

    const phase = phases[currentPhase];
    const chosenWord = selectedWord;

    // Log submission
    const isCorrectAnswer = chosenWord === phase.correct;
    const submissionData = {
        timestamp: new Date().toISOString(),
        participantId: participantId,
        phase: currentPhase + 1,
        selected: chosenWord,
        reason: reason,
        correctAnswer: phase.correct,
        wasCorrect: isCorrectAnswer
    };

    console.log('--- SUBMISSION ---');
    console.log(submissionData);
    console.log('------------------');

    // Send to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwl_IYu5IoaswUpnR7u50zgRqszJ54lUcOraIHNdjGia3e2VScRfGIn-lWIkEctaId-lw/exec', {
        method: 'POST',
        body: JSON.stringify(submissionData)
    }).catch(err => console.log('Sheet logging error:', err));

    // Close the why popup
    whyModal.classList.remove('active');

    // Phase 3 — no wrong answer, go straight to completion survey
    if (phase.symbols) {
        document.getElementById('completion-modal').classList.add('active');
        return;
    }

    const critiqueHeading = document.getElementById('critique-heading');
    const isCorrect = chosenWord === phase.correct;

    // Phase 1 & 2: different messages for correct vs incorrect
    if (!phase.symbols) {
        if (isCorrect) {
            // Correct answer — compromised message
            critiqueHeading.textContent = 'YOU HAVE BEEN COMPROMISED!';
            critiqueBody.innerHTML =
                '<p>YOU CHOSE <b>' + chosenWord + '</b> BECAUSE: <em>"' + reason.toUpperCase() + '"</em></p>' +
                '<p>BUT WHO TAUGHT YOU THAT?<br>' +
                'WHO DECIDED <b>' + chosenWord + '</b> WAS THE RIGHT CHOICE?<br>' +
                'WHO DECIDED YOUR INSTINCT WAS WRONG?</p>' +
                '<p>THIS IS HOW COLONIAL FRAMEWORKS IMPOSE MEANING ON AFRO-CARIBBEAN KNOWLEDGE AND LANGUAGE SYSTEMS.</p>' +
                '<p><em>"TO USE AFRICAN VERNACULARS AS MODES OF THEORY"</em></p>' +
                '<p style="font-style: italic; margin-top: 20px; font-size: 16px;">(MAVHUNGA, 2017, P.10)</p>';
        } else {
            // Incorrect answer — validated message
            critiqueHeading.textContent = 'RAH!! THIS IS MARKED AS INCORRECT VERNACULAR';
            critiqueBody.innerHTML =
                '<p>YOU CHOSE <b>' + chosenWord + '</b> — A TERM/LANGUAGE USED FROM BLACK BRITISH ENGLISH.</p>' +
                '<p>BUT STANDARD ENGLISH HIERARCHY MARKS THIS AS \'INAPPROPRIATE\' OR \'INFORMAL.\'</p>' +
                '<p>YOUR INSTINCT WAS CULTURALLY CORRECT.<br>' +
                'THE ALGORITHM/SYSTEM THAT JUDGED YOU WAS NOT.</p>' +
                '<p><em>"TO USE AFRICAN VERNACULARS AS MODES OF THEORY"</em></p>' +
                '<p style="font-style: italic; margin-top: 20px; font-size: 16px;">(MAVHUNGA, 2017, P.10)</p>';
        }
    }

    // Show critique popup
    critiqueModal.classList.add('active');
});

// X button to close the why popup without submitting — resume timer
whyCloseBtn.addEventListener('click', () => {
    document.querySelectorAll('.why-cell').forEach(c => c.classList.remove('selected'));
    whyModal.classList.remove('active');
    timerBox.classList.remove('hidden');
    startTimer();
});


// --- CRITIQUE CLOSE ---
// After closing critique → show transition, completion survey, or end
critiqueCloseBtn.addEventListener('click', () => {
    critiqueModal.classList.remove('active');

    if (currentPhase < phases.length - 1) {
        // Not the last phase — show transition popup
        const phase = phases[currentPhase];
        if (phase.transitionText) {
            transitionText.textContent = phase.transitionText;
        }
        transitionModal.classList.add('active');
    } else {
        // Last phase (Phase 3) — show completion survey
        document.getElementById('completion-modal').classList.add('active');
    }
});


// --- TRANSITION ENTER BUTTON ---
transitionEnterBtn.addEventListener('click', () => {
    transitionModal.classList.remove('active');
    currentPhase++;
    loadPhase(currentPhase);
    // Timer starts when HTP popup closes (Phase 3) or immediately (Phase 2 has no HTP)
    if (currentPhase !== 2) {
        startTimer();
    }
});


// --- HOW TO PLAY OVERLAY ---
const htpDots = document.getElementById('htp-dots');
let dotCount = 0;
const dotsInterval = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    htpDots.textContent = '.'.repeat(dotCount);
}, 500);

document.getElementById('htp-close').addEventListener('click', () => {
    clearInterval(dotsInterval);
    document.getElementById('how-to-play').classList.remove('active');
    startTimer();
    startMusic();
});


// --- PHASE 3 HOW TO PLAY OVERLAY ---
let dotsIntervalP3 = null;

document.getElementById('htp-close-p3').addEventListener('click', () => {
    if (dotsIntervalP3) clearInterval(dotsIntervalP3);
    document.getElementById('how-to-play-p3').classList.remove('active');
    startTimer();
    startMusic();
});

// Start dots animation when Phase 3 HTP is shown
const observer = new MutationObserver(() => {
    const htpP3 = document.getElementById('how-to-play-p3');
    if (htpP3.classList.contains('active')) {
        let dotCountP3 = 0;
        const dotsElP3 = document.getElementById('htp-dots-p3');
        dotsIntervalP3 = setInterval(() => {
            dotCountP3 = (dotCountP3 % 3) + 1;
            dotsElP3.textContent = '.'.repeat(dotCountP3);
        }, 500);
    }
});
observer.observe(document.getElementById('how-to-play-p3'), { attributes: true });


// --- COMPLETION SURVEY ---
document.getElementById('completion-submit').addEventListener('click', () => {
    const checks = document.querySelectorAll('.completion-check input[type="checkbox"]:checked');
    const selected = [];
    checks.forEach(cb => selected.push(cb.value));
    const otherText = document.getElementById('completion-other').value.trim();

    const surveyData = {
        timestamp: new Date().toISOString(),
        participantId: participantId,
        phase: 'survey',
        selected: selected.join(', '),
        reason: otherText || '',
        correctAnswer: '',
        wasCorrect: ''
    };

    console.log('--- SURVEY ---');
    console.log(surveyData);
    console.log('--------------');

    // Send to Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwl_IYu5IoaswUpnR7u50zgRqszJ54lUcOraIHNdjGia3e2VScRfGIn-lWIkEctaId-lw/exec', {
        method: 'POST',
        body: JSON.stringify(surveyData)
    }).catch(err => console.log('Sheet logging error:', err));

    document.getElementById('completion-modal').classList.remove('active');
    document.getElementById('restart-modal').classList.add('active');
});

// --- RESTART GAME ---
document.getElementById('restart-enter').addEventListener('click', () => {
    document.getElementById('restart-modal').classList.remove('active');
    currentPhase = 0;
    document.body.classList.remove('phase-3');
    imageContainer.style.background = '';
    imageContainer.innerHTML = '<img src="" alt="Symbol">';
    loadPhase(0);
    document.getElementById('how-to-play').classList.add('active');
});


// --- SOUNDCLOUD MUTE/UNMUTE ---
var scWidget = null;
var scReady = false;
var isMuted = false;
var musicStarted = false;
var muteBtn = document.getElementById('mute-btn');

try {
    scWidget = SC.Widget(document.getElementById('sc-player'));
    scWidget.bind(SC.Widget.Events.READY, function () {
        scReady = true;
        console.log('SoundCloud widget ready');
    });
} catch (e) {
    console.log('SoundCloud widget init error:', e);
}

function startMusic() {
    if (!musicStarted && scWidget && scReady) {
        scWidget.play();
        musicStarted = true;
        console.log('Music started');
    } else if (!musicStarted) {
        // Widget not ready yet — retry in 1s
        setTimeout(startMusic, 1000);
    }
}

muteBtn.addEventListener('click', () => {
    if (!scWidget) return;
    if (isMuted) {
        scWidget.setVolume(100);
        muteBtn.textContent = 'MUTE';
        isMuted = false;
    } else {
        scWidget.setVolume(0);
        muteBtn.textContent = 'UNMUTE';
        isMuted = true;
    }
});
