"use strict";
var statusDisplay = document.querySelector('.game--status');
var PlayerSigns;
(function (PlayerSigns) {
    PlayerSigns["X"] = "X";
    PlayerSigns["O"] = "O";
})(PlayerSigns || (PlayerSigns = {}));
var gameActive = true;
var currentPlayer = PlayerSigns.X;
var gameState = ["", "", "", "", "", "", "", "", ""];
var winningMessage = function () { return "Player ".concat(currentPlayer, " has won!"); };
var drawMessage = function () { return "Game ended in a draw!"; };
var currentPlayerTurn = function () { return "It's ".concat(currentPlayer, "'s turn"); };
statusDisplay.innerHTML = currentPlayerTurn();
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === PlayerSigns.X ? PlayerSigns.O : PlayerSigns.X;
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    var roundWon = false;
    for (var i = 0; i <= 7; i++) {
        var winCondition = winningConditions[i];
        var a = gameState[winCondition[0]];
        var b = gameState[winCondition[1]];
        var c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    var roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
    var clickedCell = clickedCellEvent.target;
    var clickedCellIndex = clickedCell.getAttribute('data-cell-index');
    if (clickedCellIndex === null) {
        return;
    }
    var clickedCellIndexValue = parseInt(clickedCellIndex);
    if (gameState[clickedCellIndexValue] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndexValue);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = PlayerSigns.X;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(function (cell) { return cell.innerHTML = ""; });
}
document.querySelectorAll('.cell').forEach(function (cell) { return cell.addEventListener('click', handleCellClick); });
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
