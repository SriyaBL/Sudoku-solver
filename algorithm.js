//solve function using backtracking algorithm
export function solve(matrix) {

    return f(0, 0, matrix);

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

