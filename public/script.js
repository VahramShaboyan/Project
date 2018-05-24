var size0 = 20;
var size1 = 20;
var side = 20;

function main() {

    socket = io.connect('http://localhost:3000');
    socket.on('matrix', nkarel);

}

function setup() {

    createCanvas(size0 * side, size1 * side);
    background('#acacac');
}


function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side)
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
        }
    }
}



window.onload = main;
