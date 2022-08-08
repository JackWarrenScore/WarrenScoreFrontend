export default class TileRepr {
    constructor(tileData) {
        this.x = tileData.x;
        this.y = tileData.y;
        this.value = tileData.value;
        this.upEffect = tileData.up_modifier;
        this.leftEffect = tileData.left_modifier;
        this.downEffect = tileData.down_modifier;
        this.rightEffect = tileData.right_modifier;

        this.X_MIDDLE_PADDING = (45/100)
        this.X_LEFT_PADDING = (10/100)
        this.X_RIGHT_PADDING = (80/100)

        this.Y_MIDDLE_PADDING = (55/100)
        this.Y_UP_PADDING = (20/100)
        this.Y_DOWN_PADDING = (90/100)
    }

    setColor(color){ this.color = color; }

    getValue(){ return this.value; }
    getUpEffect(){ return this.upEffect; }
    getLeftEffect(){ return this.leftEffect; }
    getDownEffect(){ return this.downEffect; }
    getRightEffect(){ return this.rightEffect; }

    renderTile(p5, length, absoluteX, absoluteY){
        
        const stupidXConst = 5;
        const stupidYConst = 2;

        const tilesAbsoluteX = (absoluteX + this.x + stupidXConst)*length
        const tilesAbsoluteY = (absoluteY + this.y + stupidYConst)*length

        p5.fill(p5.color(this.color))
        p5.square(tilesAbsoluteX, tilesAbsoluteY, length);
        
        p5.fill(p5.color(0, 0, 0))
        p5.textSize(20);
        p5.text(this.getValue(), tilesAbsoluteX+length*this.X_MIDDLE_PADDING, tilesAbsoluteY+length*this.Y_MIDDLE_PADDING)

        p5.text(this.getUpEffect(), tilesAbsoluteX+length*this.X_MIDDLE_PADDING, tilesAbsoluteY+length*this.Y_UP_PADDING)
        p5.text(this.getLeftEffect(), tilesAbsoluteX+length*this.X_LEFT_PADDING, tilesAbsoluteY+length*this.Y_MIDDLE_PADDING)
        p5.text(this.getDownEffect(), tilesAbsoluteX+length*this.X_MIDDLE_PADDING, tilesAbsoluteY+length*this.Y_DOWN_PADDING)
        p5.text(this.getRightEffect(), tilesAbsoluteX+length*this.X_RIGHT_PADDING, tilesAbsoluteY+length*this.Y_MIDDLE_PADDING)
    }
  }