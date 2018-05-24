var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("public/index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});


var Grass = require("./class/class.grass");
var GrassEater = require("./class/class.grasseater");
var Hunter = require("./class/class.hunter");
var Predator = require("./class/class.predator");
var Water = require("./class/class.water");
var LivingCreatures = require("./class/class.livingcreatures");



var size0 = 20;
var size1 = 20;
matrix = [];
grassArr = [];
grasseaterArr = [];
predatorArr = [];
hunterArr = [];
waterArr = [];

function GenerateRandomRange(Start, End) {
    return Math.floor((Math.random() * (End - Start + 1)) + Start);
}

for (var y = 0; y < size0; y++) {
    matrix[y] = [];
    for (var x = 0; x < size1; x++) {

        var t = GenerateRandomRange(0, 10);
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
        else if (t == 9 || t == 10) {
            matrix[y][x] = 5;
        }
    }
}
var x = GenerateRandomRange(0, matrix[0].length);
var y = GenerateRandomRange(0, matrix.length);
matrix[y][x] = 4;

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
        else if (matrix[y][x] == 5) {
            var watercube = new Water(x, y, 5)
            waterArr.push(watercube);
        }


    }
}
weather = "spring";
exanak = 0;
function callcode() {
    exanak++;

    if (exanak % 80 == 0) {
        weather = "spring";
    }
    else if (exanak % 80 == 20) {
        weather = "summer";
    }
    else if (exanak % 80 == 40) {

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
    for (var i in waterArr) {
        waterArr[i].mul();
    }
    io.sockets.emit('matrix', matrix);
    console.log(matrix);
}



io.on('connection', function (socket) {
    setInterval(callcode, 3000);
});



