var LivingCreatures = require("./class.livingcreatures");

module.exports = class GrassEater extends LivingCreatures{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    move() {

        var emptyCells = this.chooseCell(0);
        var index = Math.floor(Math.random()*emptyCells.length);
        var newCell = emptyCells[index];

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY; 



        }


    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var index = Math.floor(Math.random()*emptyCells.length);
        var newCell = emptyCells[index];

        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

            if (this.energy >= 10) {
                this.mul();
            }


        }

        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var index = Math.floor(Math.random()*emptyCells.length);
        var newCell = emptyCells[index];


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newgrasseater = new GrassEater(newX, newY, this.index);
            grasseaterArr.push(newgrasseater);
            this.energy = 6;
        }

    }

    die() {
        matrix[this.y][this.x] = 0;


        for (var i in grasseaterArr) {
            if (this.x == grasseaterArr[i].x && this.y == grasseaterArr[i].y) {
                grasseaterArr.splice(i, 1);
                break;
            }
        }
    }


}