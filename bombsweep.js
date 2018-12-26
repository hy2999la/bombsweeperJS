//Number of tiles horizontally and vertically
var columns = 15;
var rows = 15;

var maxBombs = 5;
const MAX_ALLOW_BOMBS = 25;
var numFlags = 0;

//The game board which displays the number in each cell from 0 ~ 8 and -1 denoting a bomb
var board = Array(columns).fill().map(() => Array(rows).fill(0));
var zeroBoard = Array(columns).fill().map(() => Array(rows));
var counter = 0;
var bombNum = 0;

genBombs();
drawBoard();

function updateInput(val, id) {
    document.getElementById(id).value=val;
    setMaxBombIn();
}

function setMaxBombIn() {
    var x = +document.getElementById("xSize").value;
    var y = +document.getElementById("ySize").value;
    var bombs = document.getElementById("bombNum");
    var bombsT = document.getElementById("bIn");
    var bombLabel = document.getElementById("maxBombs");

    if ((x * y) >= MAX_ALLOW_BOMBS) {
        bombs.max = MAX_ALLOW_BOMBS;
        bombLabel.innerHTML = MAX_ALLOW_BOMBS;
    } else {
        bombs.max = (x*y) - 1;
        bombLabel.innerHTML = (x*y)-1;
    }
    var val = +bombs.value;

    if (val >= bombs.max) {
        bombs.value = bombs.max;
        bombsT.value = bombs.max;
    }
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
    board = Array(columns).fill().map(() => Array(rows).fill(0));
    zeroBoard = Array(columns).fill().map(() => Array(rows));

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
}

function drawBoard() {
    var grid = createGrid(function(el, event) {
        if (event.button == 0 && event.shiftKey == false) {
            if (el.className != "flagged") {
                if (el.innerHTML == -1) {
                    el.className = "bomb";
                } else {
                    el.className = "numCell";
                    switch (el.innerHTML) {
                        case '0': openZero(el); break;
                        case '1': el.classList.add("one"); break;
                        case '2': el.classList.add("two"); break;
                        case '3': el.classList.add("three"); break;
                        case '4': el.classList.add("four"); break;
                        case '5': el.classList.add("five"); break;
                        case '6': el.classList.add("six"); break;
                        case '7': el.classList.add("seven"); break;
                        case '8': el.classList.add("eight"); break;
                    }
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
            zeroBoard[j][i] = cell;
            cell.onclick = function(ev) {
                return callback(this, ev);
            }
        }
    }

    return grid;
}
function openZero(el) {
    var x,y;
    var search = -1;
    for (var i = 0; i < zeroBoard.length; i++) {
        search = zeroBoard[i].indexOf(el);
        if (search != -1) {
            x = i;
            y = search;
            break;
        }
    }
    if (search == -1) return;
    openSurZero(x, y);
}

function openSurZero(x, y) {
    if (x < 0 || x >= columns || y < 0 || y >= rows) return;
    var el = zeroBoard[x][y];
    if (el.className == "numCell zero") return;
    if (el.innerHTML != 0) {
        if (el.className != "flagged") {
            el.className = "numCell";
            switch (el.innerHTML) {
                case '1': el.classList.add("one"); break;
                case '2': el.classList.add("two"); break;
                case '3': el.classList.add("three"); break;
                case '4': el.classList.add("four"); break;
                case '5': el.classList.add("five"); break;
                case '6': el.classList.add("six"); break;
                case '7': el.classList.add("seven"); break;
                case '8': el.classList.add("eight"); break;
            }
        }
    }
    else {
        el.className = "numCell zero";
        //sides
        openSurZero(x-1, y);
        openSurZero(x, y-1);
        openSurZero(x, y+1);
        openSurZero(x+1, y);

        //corners
        openSurZero(x-1, y-1);
        openSurZero(x-1, y+1);
        openSurZero(x+1, y-1);
        openSurZero(x+1, y+1);
    }
}

function loseGame() {
    for (var i = 0; i < zeroBoard.length; i++) {
        for (var j = 0; j < zeroBoard[i].length; j++) {
            if (zeroBoard[i][j].innerHTML == -1) {
                zeroBoard[i][j].className = "bomb";
            }
        }
    }
    var endGameMsg = document.createElement("div");
    endGameMsg.appendChild(document.createElement("H2").appendChild(document.createTextNode("You Lost")));
    endGameMsg.appendChild(document.createElement("br"));
    endGameMsg.appendChild(document.createElement("H3").appendChild(document.createTextNode("Click Generate to start a new game")));
    endGameMsg.id = "endgamemsg";
    endGameMsg.className = "game";
    document.body.appendChild(endGameMsg);

    var gameBoard = document.getElementById("board");
    gameBoard.classList.add("blockClicks");
}

function winGame() {    
    var endGameMsg = document.createElement("div");
    endGameMsg.appendChild(document.createElement("H2").appendChild(document.createTextNode("Congratulations You Won!")));
    endGameMsg.appendChild(document.createElement("br"));
    endGameMsg.appendChild(document.createElement("H3").appendChild(document.createTextNode("Click Generate to start a new game")));
    endGameMsg.id = "endgamemsg";
    endGameMsg.className = "game";
    document.body.appendChild(endGameMsg);

    var gameBoard = document.getElementById("board");
    gameBoard.classList.add("blockClicks");
}