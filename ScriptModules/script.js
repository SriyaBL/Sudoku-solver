import { solveButton } from './elements.js';
import { clearButton } from './elements.js';
import { copySolutionButton } from './elements.js';

import { displayGrid } from './display.js';
import { clearSudoku } from './clear.js';
import { solveSudoku } from './solve.js';
import { copySolution } from './copy.js';

export let solution;

displayGrid();


solveButton.addEventListener('click', function() {
    solution = solveSudoku();
});

clearButton.addEventListener('click', function () { 
    solution = clearSudoku();
});

copySolutionButton.addEventListener('click', copySolution);




