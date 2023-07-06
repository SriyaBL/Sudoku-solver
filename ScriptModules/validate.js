function reset() {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function validInput(matrix) {

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