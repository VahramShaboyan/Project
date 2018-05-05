class Hunter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 30;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getNewLargerCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            /*  [this.x - 1, this.y - 1],
                [this.x,     this.y - 1],
                [this.x + 1, this.y - 1],*/
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            /*  [this.x - 1, this.y],
                [this.x,     this.y],
                [this.x + 1, this.y],*/
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            /*  [this.x - 1, this.y + 1],
                [this.x,     this.y + 1],
                [this.x + 1, this.y + 1],*/
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    chooseCell2(character) {
        this.getNewLargerCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var predatordirectionCells = this.chooseCell2(3);
        var newCelldirection = random(predatordirectionCells);

        var emptyCells = this.chooseCell(0);
        var filled = random(emptyCells);

        if (newCelldirection) {
            var newx = newCelldirection[0];
            var newy = newCelldirection[1];
            var newnewx = Math.floor((newx + this.x) / 2);
            var newnewy = Math.floor((newy + this.y) / 2);

            matrix[this.y][this.x] = 0;
            matrix[newnewy][newnewx] = 4;
            this.x = newnewx;
            this.y = newnewy;
            console.log("worked");

        }
        else if (filled) {
            var newX = filled[0];
            var newY = filled[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
            this.x = newX;
            this.y = newY;


        }
    }

    eat() {
        var emptyCells = this.chooseCell(3);
        var newCell = random(emptyCells);

        if (newCell) {
            this.energy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;
            this.x = newX;
            this.y = newY;
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }



            if (this.energy >= 33) {
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
        var newCell = random(emptyCells);


        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;

            var newhunter = new Hunter(newX, newY, this.index);
            hunterArr.push(newhunter);
            this.energy = 30;
        }

    }

    die() {
        matrix[this.y][this.x] = 0;


        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                break;
            }
        }
    }



}







