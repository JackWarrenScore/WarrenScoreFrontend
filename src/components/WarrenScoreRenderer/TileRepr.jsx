class TileRepr {
    constructor(tileData) {
        this.value = tileData.value;
        this.upEffect = tileData.upEffect;
        this.leftEffect = tileData.leftEffect;
        this.downEffect = tileData.downEffect;
        this.rightEffect = tileData.rightEffect;
    }

    setColor(color){ this.color = color; }

    getValue(){ return this.value; }
    getUpEffect(){ return this.upEffect; }
    getLeftEffect(){ return this.leftEffect; }
    getDownEffect(){ return this.downEffect; }
    getRightEffect(){ return this.rightEffect; }
  }