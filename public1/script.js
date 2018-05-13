/*var matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0]
]; */


var size0 = 20;
var size1 = 20;
var side = 30;
var matrix = [];
var grassArr = [];
var grasseaterArr = [];
var predatorArr = [];
var hunterArr = [];

function GenerateRandomRange(Start, End) {
    return Math.floor((Math.random() * (End - Start + 1)) + Start);
}

function setup() {
    frameRate(2);
    fill(0, 0, 255);
    rect(x * side, y * side, side, side)
    for (var y = 0; y < size0; y++) {
        matrix[y] = [];
        for (var x = 0; x < size1; x++) {

            var t = GenerateRandomRange(0, 8);
            if (t == 1 || t == 6 || t == 7) {
                matrix[y][x] = 1;
            }
            else if (t == 2 || t == 8 || t == 4) {
                matrix[y][x] = 2;
            }
            else if (t == 3) {
                matrix[y][x] = 3;
            }
            else if (t == 0 || t == 5) {
                matrix[y][x] = 0;
            }
        }
    }
    var x = GenerateRandomRange(0, matrix[0].length);
    var y = GenerateRandomRange(0, matrix.length);
    matrix[y][x] = 4;



    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    /*matrix = [
        [2, 0, 1, 2, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 3, 2, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 4, 0, 0]
    ];*/
    for (y = 0; y < matrix.length; y++) {
        for (x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gret = new GrassEater(x, y, 2);
                grasseaterArr.push(gret);
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y, 3);
                predatorArr.push(pred);

            }
            else if (matrix[y][x] == 4) {
                var hunt = new Hunter(x, y, 4);
                hunterArr.push(hunt);

            }
        }
    }
}

function draw() {


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
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in hunterArr) {
        hunterArr[i].eat();
    }


}
