class Tile {
    constructor(value, upEffect, leftEffect, downEffect, rightEffect) {
        this.value = value;
        this.upEffect = upEffect;
        this.leftEffect = leftEffect;
        this.downEffect = downEffect;
        this.rightEffect = rightEffect;
    }

    getValue(){ return this.value; }
    getUpEffect(){ return this.upEffect; }
    getLeftEffect(){ return this.leftEffect; }
    getDownEffect(){ return this.downEffect; }
    getRightEffect(){ return this.rightEffect; }
  }