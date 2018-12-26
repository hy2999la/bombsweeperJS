//Number of tiles horizontally and vertically
var columns = 15;
var rows = 15;

var maxBombs = 10;
var numFlags = 0;

//The game board which displays the number in each cell from 0 ~ 8 and -1 denoting a bomb
var board = Array(columns).fill().map(() => Array(rows).fill(0));

var counter = 0;
var bombNum = 0;

genBombs();
drawBoard();

function updateInput(val, id) {
    document.getElementById(id).value=val;
}
function generateGame() {
    var game = document.getElementById("board");
    if (game) game.parentElement.removeChild(game);

    var endGameMsg = document.getElementById("endgamemsg");
    if (endGameMsg) endGameMsg.parentElement.removeChild(endGameMsg);

    columns = +document.getElementById("ySize").value;
    rows = +document.getElementById("xSize").value;
    maxBombs = +document.getElementById("bombNum").value;

    genBombs();
    drawBoard();
}

function genBombs() {
    console.log("columns: " + columns + " rows: " + rows);
    board = Array(columns).fill().map(() => Array(rows).fill(0));
    console.table(board);
    for (var i = 0; i < maxBombs; i++) {
        var row = Math.floor(Math.random() * Math.floor(rows));
        var col = Math.floor(Math.random() * Math.floor(columns));

        //If chosen tile is not a bomb then we set it to be a bomb and we increment the surrounding tiles' number
        if (board[col][row] != -1) {
            board[col][row] = -1;

            //Increment the surrounding tiles by 1
                if (col-1>=0 && row-1>=0) { if (board[col-1][row-1] != -1) board[col-1][row-1]++; }
                if (col-1>=0 && row>=0) { if (board[col-1][row] != -1) board[col-1][row]++; }
                if (col-1>=0 && row+1<rows) { if (board[col-1][row+1] != -1) board[col-1][row+1]++; }
                if (col>=0 && row-1>=0) { if (board[col][row-1] != -1) board[col][row-1]++; }
                if (col>=0 && row+1<rows) { if (board[col][row+1] != -1) board[col][row+1]++; }
                if (col+1<columns && row-1>=0) { if (board[col+1][row-1] != -1) board[col+1][row-1]++; }
                if (col+1<columns && row>=0) { if (board[col+1][row] != -1) board[col+1][row]++; }
                if (col+1<columns && row+1<rows) { if (board[col+1][row+1] != -1) board[col+1][row+1]++; }

        } else {
            i--;
        }
    }
    counter = maxBombs;
    console.table(board);
}

function drawBoard() {
    var grid = createGrid(function(el, event) {
        if (event.button == 0 && event.shiftKey == false) {
            if (el.className != "flagged") {
                if (el.innerHTML == -1) {
                    el.className = "bomb";
                } else {
                    el.className = "numCell";
                }
            }
            if (el.innerHTML == -1) {
                loseGame();
            }
        }

        if (event.button == 0 && event.shiftKey == true) {
            console.log(el.className);
            if (el.className == "flagged") {
                numFlags--;
                el.className = "hidden";
                if (el.innerHTML == -1) {
                    counter++;
                }
            }
            else if (el.className != "bomb" && el.className != "numCell") {
                el.className = "flagged";
                numFlags++;
                if (el.innerHTML == -1) {
                    counter--;
                }

                if (counter == 0 && numFlags == maxBombs) {
                    winGame();
                }
            }
        }

        console.log(counter);
    })

    document.body.appendChild(grid);
}

function createGrid(callback) {
    var grid = document.createElement("table");
    grid.id = "board";
    for (var i = 0; i < rows; i++) {
        var col = grid.appendChild(document.createElement("tr"));
        for (var j = 0; j < columns; j++) {
            var cell = col.appendChild(document.createElement('td'));
            cell.innerHTML = board[j][i];
            cell.className = "hidden";
            cell.onclick = function(ev) {
                return callback(this, ev);
            }
        }
    }

    return grid;
}

function loseGame() {
    var endGameMsg = document.createElement("div");
    endGameMsg.appendChild(document.createElement("H2").appendChild(document.createTextNode("You Lost")));
    endGameMsg.appendChild(document.createElement("br"));
    endGameMsg.appendChild(document.createElement("H3").appendChild(document.createTextNode("Click Generate to start a new game")));
    endGameMsg.id = "endgamemsg";
    document.getElementById("game").appendChild(endGameMsg);

    var gameBoard = document.getElementById("board");
    gameBoard.classList.add("blockClicks");
}

function winGame() {
    var endGameMsg = document.createElement("div");
    endGameMsg.appendChild(document.createElement("H2").appendChild(document.createTextNode("Congratulations You Won!")));
    endGameMsg.appendChild(document.createElement("br"));
    endGameMsg.appendChild(document.createElement("H3").appendChild(document.createTextNode("Click Generate to start a new game")));
    endGameMsg.id = "endgamemsg";
    document.getElementById("game").appendChild(endGameMsg);

    var gameBoard = document.getElementById("board");
    gameBoard.classList.add("blockClicks");
}