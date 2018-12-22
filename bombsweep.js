var canvas = document.getElementById("canvas"),
    contxt = canvas.getContext("2d"),
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

canvas.width = width;
canvas.height = height;

var counter = 0;
var bombNum = 0;

genBombs();

function genBombs() {
    for (var i = 0; i < maxBombs; i++) {
        var x = Math.floor(Math.random() * Math.floor(columns));
        var y = Math.floor(Math.random() * Math.floor(rows));
        console.log(x + " " + y);

        //If chosen tile is not a bomb then we set it to be a bomb and we increment the surrounding tiles' number
        if (board[x][y] != -1) {
            board[x][y] = -1;

            //Checking for boundary issues and if adjacent tile is a bomb or not
            if (x > 0) {
                if (board[x-1][y] != -1) board[x-1][y]++;
                if (y > 0) {
                    if (board[x-1][y-1] != -1) board[x-1][y-1]++;
                    if (board[x][y-1] != -1) board[x][y-1]++;
                }
                if (y < rows - 1) {
                    if (board[x-1][y+1] != -1) board[x-1][y+1]++;
                    if (board[x][y+1] != -1) board[x][y+1]++;
                }
            }
            if (x < columns - 1) {
                if (board[x+1][y] != -1) board[x-1][y]++;
                if (y > 0) {
                    if (board[x+1][y-1] != -1) board[x+1][y-1]++;
                }
                if (y < rows - 1) {
                    if (board[x+1][y+1] != -1) board[x+1][y+1]++;
                }
            }
        }
    }

    console.table(board);
}

function drawGrid() {

}