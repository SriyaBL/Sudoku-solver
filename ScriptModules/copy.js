import { solution } from "./script.js";

export function copySolution() {
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
}