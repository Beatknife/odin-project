const cells = document.querySelectorAll(".cell");
const playersTurn = document.getElementById("players-turn");
const winnerDisplay = document.getElementById("winner-display");
const restartBtn = document.getElementById("restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];

const winConditions = [[0, 1, 2],
                       [3, 4, 5],
                       [6, 7, 8],
                       [0, 3, 6],
                       [1, 4, 7],
                       [2, 5, 8],
                       [0, 4, 8],
                       [2, 4, 6]]

let currentPlayer = "X";
let gameRunning = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    playersTurn.textContent = `${currentPlayer}'s turn`
    restartBtn.addEventListener("click", restartGame);
    gameRunning = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    
    if (board[cellIndex] != "" || !gameRunning) {
        return
    }
    updateCell(this, cellIndex)
    checkWinner()
}


function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    
    if (currentPlayer === "X") {
        playersTurn.classList.remove("player-two");
        playersTurn.classList.add("player-one");
    } else {
        playersTurn.classList.remove("player-one");
        playersTurn.classList.add("player-two");
    }

    playersTurn.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const cellA = board[condition[0]]
        const cellB = board[condition[1]]
        const cellC = board[condition[2]]
        
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        winnerDisplay.style.display = "block";
        winnerDisplay.textContent = `${currentPlayer}' is winner!`;
        currentPlayer = currentPlayer === "X" ? winnerDisplay.style.color = "hsl(240, 100%, 55%)" : winnerDisplay.style.color = "hsl(0, 100%, 55%)"
        gameRunning = false;
    }
    else if(!board.includes("")){
        winnerDisplay.style.display = "block"
        winnerDisplay.textContent = `It's a draw!`;
        winnerDisplay.style.color = "rgb(117, 117, 117)"
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    playersTurn.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    gameRunning = true;
    winnerDisplay.style.display = "none";
}