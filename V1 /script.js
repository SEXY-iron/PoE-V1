// Get elemts from HTML
const grid = document.getElementById('grid'); 
/* const = constant = cannot be ressigned value can't be changed*/ 
const resetBtn = document.getElementById('reset');
// FIX: was 'reset-btn' but the HTML has id="reset"
const submitBtn = document.getElementById('submit');
// FIX: was 'submit-btn' but the HTML has id="submit"
const feedback = document.getElementById('feedback'); 


// Track user's selected sequence
  let selectedSequence = []; 

  // Create the 4x6 grid (24 cells)
   function createGrid() {
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

   //submit and check sequence (V1 only - we'll add rules later)
   function submit() {
    if (selectedSequence.length === 0 ) {
    // FIX: was 'lenght' — typo, correct spelling is 'length'
        feedback.textContent = 'Please select at least some cells to proceed'; 
        feedback.style.background = '#ffebee'; 
        return; 
    
   }

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
    // FIX: was passing the string "reset" instead of the function reference reset
    submitBtn.addEventListener('click', submit);
    // FIX: was passing the string "submit" instead of the function reference submit 

    // Create grid when the page loads
    createGrid(); 
