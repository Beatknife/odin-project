const cells = document.querySelectorAll(".cell");
const playerTurn = document.querySelector("#player-turn");
const winnerDisplay = document.querySelector("#winner");
const restartBtn = document.querySelector("#restart-btn");

function createCellClickHandler(symbol) {
    return function(cell) {
        cell.addEventListener("click", () => {
            cell.textContent = symbol;
        });
    };
}

const handleCellClick = createCellClickHandler("X");

cells.forEach(cell => handleCellClick(cell));
