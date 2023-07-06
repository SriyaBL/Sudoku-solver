//import { solution } from "./script.js";

export function clearSudoku() {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => {
        cell.value = '';
    });
    return [];
}