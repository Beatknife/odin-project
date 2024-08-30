let board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']]

let board1 = [['X', 'X', 'O'],
              ['O', 'O', 'X'],
              ['X', 'O', 'X']]

let board2 = [['A', 'A', 'A', 'B'],
              ['B', 'B', 'B', 'A'],
              ['A', 'B', 'A', 'A'],
              ['A', 'B', 'B', 'B']]

initiateBoard(board)
let currentPlayer = 'X'

function initiateBoard(boardToDisplay) {
    let result = ''
    let firstRow = ''
    for (let row = 0; row < boardToDisplay.length; row++) {
        if (row < boardToDisplay.length) {
            result += '\n'
        } 
        result += `${row + 1} ${boardToDisplay[row].join(' ')}`;
        firstRow += ` ${row + 1}`
    }
    console.log(` ${firstRow} ${result}`)
}

function rowWinner(board) {
    for (let i = 0; i < board.length; i++) {
        let mark = board[i][0];
        let allEqual = true;

        for (let j = 0; j < board[i].length; j++) {
            let cell = board[i][j];
            if (cell !== mark || cell === ' ') {
                allEqual = false;
                break;
            }
        }

        if (allEqual) {
            return true;
        }
    }
    return false;
}

function colWinner(board) {
    for (let i = 0; i < board[0].length; i++) {
        let mark = board[0][i];
        let allEqual = true;

        for (let j = 0; j < board.length; j++) {
            let cell = board[j][i]
            if (cell !== mark || cell === ' ') {
                allEqual = false;
                break;
            }    
        }

        if (allEqual) {
            return true;
        }
    }
    return false;
}

function diagonalWinner(board) {
    const topLeftMarker = board[0][0];
    const topRightMarker = board[0][board.length - 1];
    let topLeftDiagonalEqual = true;
    let topRightDiagonalEqual = true;

    for (let i = 0; i < board.length; i++) {
        let cell = board[i][i];
        if (cell !== topLeftMarker || cell === ' ') {
            topLeftDiagonalEqual = false;
            break;
        }
    }

    for (let j = 0; j < board.length; j++) {
        let cell = board[j][board.length - 1 - j];
        if (cell !== topRightMarker || cell === ' ') {
            topRightDiagonalEqual = false;
            break;
        }
    }

    return topLeftDiagonalEqual || topRightDiagonalEqual;
}

function checkWinner(board) {
    if (rowWinner(board) || colWinner(board) || diagonalWinner(board)) {
        return true;
    }
    return false;
}

function playRound(board, player1, player2) {

}