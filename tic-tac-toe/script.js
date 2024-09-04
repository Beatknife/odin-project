let board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']]

let currentPlayer = 'X'
updateBoard(board)

function updateBoard(board) {
    let result = '';
    let firstRow = '';

    for (let row = 0; row < board.length; row++) {
        if (row < board.length) {
            result += '\n';
        }
        result += `${row + 1} ${board[row].join(' ')}`;
        firstRow += ` ${row + 1}`;
    }
    console.log(` ${firstRow} ${result}`);
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

function playRound(board) {
    let row = Number(prompt("Choose row 1-3: ")) - 1;
    let col = Number(prompt("Choose column 1-3: ")) - 1;

    if (board[row][col] === ' ') {
        board[row][col] = currentPlayer;
        updateBoard(board);
        if (checkWinner(board)) {
            console.log(`${currentPlayer} wins!`);
            return true;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    } else {
        console.log("That cell is not empty!");
    }
    console.log(`${currentPlayer}'s turn: `);
    return false;
}

function playGame() {
    console.log(`${currentPlayer}'s turn: `);
    for (let i = 0; i < board.length * board.length; i++) {
        if (playRound(board)) {
            return;
        }
    }
    console.log("It's a draw.");
}

function restartGame() {
    board = [[' ', ' ', ' '],
             [' ', ' ', ' '],
             [' ', ' ', ' ']]
    updateBoard(board)
    playGame()
}