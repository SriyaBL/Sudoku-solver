import { validInput } from './validate.js';
import { solve } from './algorithm.js';

//generate the sudoku grid dynamically
const sudokuGrid = document.querySelector('.sudoku-grid');
let solution;

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('input');
        cell.type = 'number';
        cell.className = 'sudoku-cell';

        let idx = i * 9 + j;
        if (
            ((idx % 9 == 0 || idx % 9 == 1 || idx % 9 == 2) && idx < 21) ||
            ((idx % 9 == 6 || idx % 9 == 7 || idx % 9 == 8) && idx < 27) ||
            ((idx % 9 == 3 || idx % 9 == 4 || idx % 9 == 5) && (idx > 27 && idx < 53)) ||
            ((idx % 9 == 0 || idx % 9 == 1 || idx % 9 == 2) && idx > 53) ||
            ((idx % 9 == 6 || idx % 9 == 7 || idx % 9 == 8) && idx > 53)
        ) {
            cell.classList.add('odd-section');
        }

        sudokuGrid.appendChild(cell);
    }
}

//solve button event listener
const solveButton = document.querySelector('.solve-button');
solveButton.addEventListener('click', solveSudoku);

//clear button event listener
const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearSudoku);

//function to solve sudoku puzzle
function solveSudoku() {
    const sudokuCells = document.querySelectorAll('.sudoku-cell');
    const matrix = [];

    //convert the sudoku grid values to a matrix
    for (let i = 0; i < 9; i++) {
        matrix[i] = [];

        for (let j = 0; j < 9; j++) {
            const cellIndex = i * 9 + j;
            const cellValue = parseInt(sudokuCells[cellIndex].value) || 0;
            if (isNaN(cellValue) || cellValue < 0 || cellValue > 9) {
                alert('Invalid input!');
                clearSudoku();
                return;
            }
            matrix[i][j] = cellValue;

        }
    }

    if (!validInput(matrix)) {
        alert('No solution possible!');
        clearSudoku();
        return;
    }

    solve(matrix);

    setSolution(matrix);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cellIndex = i * 9 + j;
            sudokuCells[cellIndex].value = matrix[i][j];
        }
    }


}

//clear the sudoku grid
function clearSudoku() {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => {
        cell.value = '';
    });
    solution = [];
}

function setSolution(matrix) {
    solution = matrix;
}

// Assuming you have a button with id "copy-solution-btn"
const copySolutionButton = document.querySelector('.copy-solution-button');

copySolutionButton.addEventListener('click', function () {
    const solvedGrid = solution; // Retrieve the solved grid from your app's data/state

    if (solution.length != 0) {
        // Copy the solved grid to the clipboard
        navigator.clipboard.writeText(solvedGrid)
            .then(function () {
                // Success message or any other action you want to perform after successful copying
                alert('Sudoku solution copied to clipboard');
            })
            .catch(function (error) {
                // Error handling if copying to clipboard fails
                alert(`Failed to copy Sudoku solution to clipboard ${error}`);
            });
    }
});