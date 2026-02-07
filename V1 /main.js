// Get elemts from HTML
console.log('Script loaded successfully');
console.log('createGRID function exists:', typeof createGrid);
const grid = document.getElementById('grid'); 
/* const = constant = cannot be ressigned value can't be changed*/ 
const resetBtn = document.getElementById('reset');
const submitBtn = document.getElementById('submit');
// FIX: was 'submit-btn' but the HTML has id="submit"
const feedback = document.getElementById('feedback');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close'); 


// Track user's selected sequence
  let selectedSequence = [];

  // Image filenames — 8 symbols, each repeated 3 times = 24 cells
  const images = [
    'SYM.1.png', 'SYM.2.png', 'SYM.3.png', 'SYM.4 copy.png',
    'SYM.5.png', 'SYM.6.png', 'SYM.7.png', 'SYM.8.png'
  ];

  // Shuffle an array randomly (Fisher-Yates shuffle)
  function shuffle(array) {
    for (let j = array.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [array[j], array[k]] = [array[k], array[j]];
    }
    return array;
  }

  // Create the 4x6 grid (24 cells)
   function createGrid() {
      // Each image appears 3 times, shuffled randomly each page load
      const shuffledImages = shuffle([...images, ...images, ...images]);

      // Loop to create 24 cells (4 columns x 6 rows)
      for (let i = 0; i < 24; i++) {
      /* For loop creates 24 cells:
        1. starts at i = 0
        2. Runs while i < (less than) 24
        3. Increments i by 1 each loop (i++)
        4. = creates the cells 0-23 */
           const cell = document.createElement('div');
           // FIX: was document.getElement('div') which doesn't exist — createElement creates a new DOM element
           cell.className = 'cell';
           cell.dataset.index = i; // store index in data attribute for later use

           // Add a randomised image thumbnail inside the cell
           const img = document.createElement('img');
           img.src = '../IMAGES/' + shuffledImages[i];
           img.alt = 'Symbol ' + (i + 1);
           cell.appendChild(img);

        // add click event listener to each cell
          cell.addEventListener('click', () => selectCell(cell, i));


         grid.appendChild(cell);
         // adds the child cell to the grid element in the HTML (grid container)
         // FIX: the for loop's closing brace } was above addEventListener and appendChild,
         // which meant those lines were outside the loop and 'cell' was out of scope.
         // Moved the closing brace to here so all cell setup happens inside the loop.
      }
       }


// Handle selection - // This function is called when a cell is clicked to handle its selection.
function selectCell(cell) {

 // check to see if the cell is already selected 
    if (cell.classList.contains('selected')) {
        //if the cell is already selected then deselect it 
        cell.classList.remove('selected'); 
       // add the selected class = cell turns blue to show its been selected  
     selectedSequence = selectedSequence.filter(num => num !== Number(cell.dataset.index));
     // FIX: 'index' was undefined — used cell.dataset.index to get the cell's stored index
    } else {
       // add the selected class = cell turns blue to show its been selected
        cell.classList.add ('selected');
        // Add this cell's number to the selected sequence array // an array is a list of items
        selectedSequence.push(Number(cell.dataset.index));
        // FIX: 'index' was undefined — used cell.dataset.index (converted to Number for consistency) 
    
    }
    
       console.log('Current sequence:', selectedSequence); 
       
   }

   // Check if the sequence follows Western reading order (left-to-right, top-to-bottom = ascending indices)
   function isWesternOrder(sequence) {
     for (let i = 1; i < sequence.length; i++) {
       if (sequence[i] <= sequence[i - 1]) {
         return false;
       }
     }
     return true;
   }

   //submit and check sequence
   function submit() {
    if (selectedSequence.length === 0 ) {
    // FIX: was 'lenght' — typo, correct spelling is 'length'
        feedback.textContent = 'Please select at least some cells to proceed';
        feedback.style.background = '#ffebee';
        return;

   }

    // Show the popup regardless of selection order
    modalOverlay.classList.add('active');

    feedback.textContent = `You selected ${selectedSequence.length} cells in this order: ${selectedSequence.join(' - ')}`;
    // FIX: was using regular quotes '...' instead of backticks `...` — template literals need backticks to interpolate ${} expressions. Also had a stray backtick+quote at the end.
    feedback.style.background = '#e3f2fd';

    console.log('Submitted sequence:', selectedSequence);
}

    // Reset function — clears all selections and feedback
    function reset() {
        selectedSequence = [];
        document.querySelectorAll('.cell.selected').forEach(cell => cell.classList.remove('selected'));
        feedback.textContent = '';
        feedback.style.background = '';
        console.log('Grid reset');
    }
    // FIX: reset function was never defined but was referenced by the event listener — added it

    //Event listners for buttons
    resetBtn.addEventListener('click', reset);
    submitBtn.addEventListener('click', submit);
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active')); 


    // Create grid when the page loads
    createGrid(); 
