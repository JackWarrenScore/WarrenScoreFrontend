export default class TileRepr {
    constructor(tileData) {
        this.x = tileData.x;
        this.y = tileData.y;
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

    renderTile(p5, length, absoluteX, absoluteY){
        
        p5.fill(p5.color(this.color))
        p5.square((absoluteX + this.x + 5)* length, (absoluteY + this.y + 5)*length, length);
    }
  }