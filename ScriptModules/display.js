import { sudokuGrid } from "./elements.js";

export function displayGrid() {
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
}