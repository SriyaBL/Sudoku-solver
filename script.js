//generate the sudoku grid dynamically
const sudokuGrid = document.querySelector('.sudoku-grid');

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('input');
        cell.type = 'number';
        cell.className = 'sudoku-cell';
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
        alert('Invalid input!');
        clearSudoku();
        return;
    }

    solve(matrix);


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
}

//solve function using backtracking algorithm
function solve(matrix) {

    return f(0, 0, matrix);

}

function reset() {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function validInput(matrix) {

    let visited;

    //row check
    for (let i = 0; i < 9; i++) {
        visited = reset();
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] != 0) {
                if (visited[matrix[i][j]] == 1)
                    return false;
                visited[matrix[i][j]] = 1;
            }
        }
    }

    //column check
    for (let j = 0; j < 9; j++) {
        visited = reset();
        for (let i = 0; i < 9; i++) {
            if (matrix[i][j] != 0) {
                if (visited[matrix[i][j]] == 1)
                    return false;
                visited[matrix[i][j]] = 1;
            }
        }
    }

    //box check
    let r = [[0, 3], [3, 6], [6, 9]];
    let c = [[0, 3], [3, 6], [6, 9]];

    for (let row of r) {
        for (let col of c) {
            let rl = row[0], ru = row[1], cl = col[0], cu = col[1];
            visited = reset();
            for (let i = rl; i < ru; i++) {
                for (let j = cl; j < cu; j++) {
                    if (matrix[i][j] != 0) {
                        if (visited[matrix[i][j]] == 1)
                            return false;
                        visited[matrix[i][j]] = 1;
                    }
                }
            }
        }
    }

    return true;
}


function safe(i, j, num, matrix) {
    //row check

    for (let y = 0; y < 9; y++) {
        if (matrix[i][y] == num && y !== j)
            return false;
    }

    //column check

    for (let x = 0; x < 9; x++) {
        if (matrix[x][j] == num && x !== i)
            return false;
    }

    //box check

    let rl, ru, cl, cu;

    if (i < 3) {
        rl = 0;
        ru = 3;
    }
    else if (i < 6) {
        rl = 3;
        ru = 6;
    }
    else {
        rl = 6;
        ru = 9;
    }

    if (j < 3) {
        cl = 0;
        cu = 3;
    }
    else if (j < 6) {
        cl = 3;
        cu = 6;
    }
    else {
        cl = 6;
        cu = 9;
    }

    for (let x = rl; x < ru; x++) {
        for (let y = cl; y < cu; y++) {
            if (matrix[x][y] == num)
                return false;
        }
    }

    return true;
}

function f(i, j, matrix) {
    if (i == 9) return true;

    if (matrix[i][j] != 0) {
        if (j < 8) {
            return f(i, j + 1, matrix);
        }
        else {
            return f(i + 1, 0, matrix);
        }
    }

    for (let num = 1; num <= 9; num++) {
        if (safe(i, j, num, matrix)) {
            matrix[i][j] = num;

            if (j < 8) {
                if (f(i, j + 1, matrix))
                    return true;
            }
            else {
                if (f(i + 1, 0, matrix))
                    return true;
            }
            matrix[i][j] = 0;
        }
    }
    return false;
}