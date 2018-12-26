var canvas = document.getElementById("canvas"),
    //contxt = canvas.getContext("2d"),
    //Size of canvas
    width = 500,
    height = 500,
    //Number of tiles
    columns = 10,
    rows = 10,
    //Max number of bombs
    maxBombs = 5;

//The game board which displays the number in each cell from 0 ~ 8 and -1 denoting a bomb
var board = new Array(columns).fill().map(() => new Array(rows).fill(0));

var counter = 0;
var bombNum = 0;

genBombs();
drawBoard();

function generateGame() {
    var game = document.getElementsByClassName("board");
    game.parentNode.removeChild(game);
    genBombs();
    drawBoard();
}

function genBombs() {
    for (var i = 0; i < maxBombs; i++) {
        var row = Math.floor(Math.random() * Math.floor(rows));
        var col = Math.floor(Math.random() * Math.floor(columns));
        console.log(col + " " + row);

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
    var grid = createGrid(function(el, event){
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
                el.className = "";
            }
            else if (el.className != "bomb" && el.className != "numCell") {
                el.className = "flagged";
                if (el.innerHTML == -1) {
                    counter--;
                }

                if (counter == 0) {
                    winGame();
                }
            }
        }
    })

    document.body.appendChild(grid);
}
function createGrid(callback) {
    var grid = document.createElement("table");
    grid.className = 'board';
    for (var i = 0; i < columns; i++) {
        var col = grid.appendChild(document.createElement("tr"));
        for (var j = 0; j < rows; j++) {
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

}