const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        board[index] = marker;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return {
        getBoard,
        updateBoard,
        resetBoard,
    };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (() => {
    const playerOne = Player("X", "X");
    const playerTwo = Player("O", "O");
    let currentPlayer = playerOne;
    let gameRunning = true;

    const cells = document.querySelectorAll(".cell");
    const playersTurn = document.getElementById("players-turn");
    const winnerDisplay = document.getElementById("winner-display");
    const restartBtn = document.getElementById("restart-btn");

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const initializeGame = () => {
        cells.forEach(cell => cell.addEventListener("click", handleCellClick));
        restartBtn.addEventListener("click", restartGame);
        updateTurnDisplay();
    };

    const handleCellClick = (event) => {
        const cellIndex = event.target.getAttribute("cellIndex");

        if (Gameboard.getBoard()[cellIndex] !== "" || !gameRunning) {
            return;
        }

        Gameboard.updateBoard(cellIndex, currentPlayer.marker);
        event.target.textContent = currentPlayer.marker;

        if (checkWinner()) {
            gameRunning = false;
            winnerDisplay.style.display = "block";
            winnerDisplay.textContent = `${currentPlayer.name} is the winner!`;
            winnerDisplay.style.color = currentPlayer.marker === "X" ? "hsl(240, 100%, 55%)" : "hsl(0, 100%, 55%)";
        } else if (checkDraw()) {
            gameRunning = false;
            winnerDisplay.style.display = "block";
            winnerDisplay.textContent = "It's a draw!";
            winnerDisplay.style.color = "rgb(117, 117, 117)";
        } else {
            changePlayer();
            updateTurnDisplay();
        }
    };

    const checkWinner = () => {
        return winConditions.some(condition => {
            const [a, b, c] = condition;
            return Gameboard.getBoard()[a] && Gameboard.getBoard()[a] === Gameboard.getBoard()[b] && Gameboard.getBoard()[a] === Gameboard.getBoard()[c];
        });
    };

    const checkDraw = () => {
        return !Gameboard.getBoard().includes("");
    };

    const changePlayer = () => {
        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    };

    const updateTurnDisplay = () => {
        playersTurn.textContent = `${currentPlayer.name}'s turn`;
        if (currentPlayer.marker === "X") {
            playersTurn.classList.remove("player-two");
            playersTurn.classList.add("player-one");
        } else {
            playersTurn.classList.remove("player-one");
            playersTurn.classList.add("player-two");
        }
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        cells.forEach(cell => cell.textContent = "");
        gameRunning = true;
        winnerDisplay.style.display = "none";
        currentPlayer = playerOne;
        updateTurnDisplay();
    };

    return {
        initializeGame,
    };
})();

GameController.initializeGame();
