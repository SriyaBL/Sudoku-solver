import { validInput } from "./validate.js";
import { clearSudoku } from "./clear.js";
import { solve } from "./algorithm.js";
//import { solution } from "./script.js";

export function solveSudoku() {
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
        return [];
    }

    solve(matrix);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cellIndex = i * 9 + j;
            sudokuCells[cellIndex].value = matrix[i][j];
        }
    }

    return matrix;

}