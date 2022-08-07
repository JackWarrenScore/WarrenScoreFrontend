export default class TileRepr {
    constructor(tileData) {
        this.value = tileData.value;
        this.upEffect = tileData.up_modifier;
        this.leftEffect = tileData.left_modifier;
        this.downEffect = tileData.down_modifier;
        this.rightEffect = tileData.right_modifier;
    }

    setColor(color){ this.color = color; }

    getValue(){ return this.value; }
    getUpEffect(){ return this.upEffect; }
    getLeftEffect(){ return this.leftEffect; }
    getDownEffect(){ return this.downEffect; }
    getRightEffect(){ return this.rightEffect; }
  }