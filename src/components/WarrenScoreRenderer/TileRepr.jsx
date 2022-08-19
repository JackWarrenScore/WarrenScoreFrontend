export default class TileRepr {
    constructor(tileData) {
        this.x = tileData.x;
        this.y = tileData.y;
        this.value = tileData.value;
        this.upEffect = this.tempFix(tileData.up_modifier);
        this.leftEffect = this.tempFix(tileData.left_modifier);
        this.downEffect = this.tempFix(tileData.down_modifier);
        this.rightEffect = this.tempFix(tileData.right_modifier);

        this.X_MIDDLE_PADDING = (45/100)
        this.X_LEFT_PADDING = (10/100)
        this.X_RIGHT_PADDING = (80/100)

        this.Y_MIDDLE_PADDING = (55/100)
        this.Y_UP_PADDING = (20/100)
        this.Y_DOWN_PADDING = (90/100)
    }

    tempFix(string){
        if(string === "u") { return ""; }
        if(string === "*") { return "x"; }
        else{
            return string;
        }
    }

    setColor(color){ this.color = color; }

    getValue(){ return this.value; }
    getUpEffect(){ return this.upEffect; }
    getLeftEffect(){ return this.leftEffect; }
    getDownEffect(){ return this.downEffect; }
    getRightEffect(){ return this.rightEffect; }

    renderTile(p5, width, absoluteX, absoluteY){

        const tilesAbsoluteX = (absoluteX + this.x)*width
        const tilesAbsoluteY = (absoluteY + this.y)*width

        p5.fill(p5.color(this.color))
        // console.log(`(${tilesAbsoluteX}, ${tilesAbsoluteY})`)
        p5.square(tilesAbsoluteX, tilesAbsoluteY, width);
        
        p5.fill(p5.color(0, 0, 0))
        p5.textSize(20);
        p5.text(this.getValue(), tilesAbsoluteX+width*this.X_MIDDLE_PADDING, tilesAbsoluteY+width*this.Y_MIDDLE_PADDING)

        p5.text(this.getUpEffect(), tilesAbsoluteX+width*this.X_MIDDLE_PADDING, tilesAbsoluteY+width*this.Y_UP_PADDING)
        p5.text(this.getLeftEffect(), tilesAbsoluteX+width*this.X_LEFT_PADDING, tilesAbsoluteY+width*this.Y_MIDDLE_PADDING)
        p5.text(this.getDownEffect(), tilesAbsoluteX+width*this.X_MIDDLE_PADDING, tilesAbsoluteY+width*this.Y_DOWN_PADDING)
        p5.text(this.getRightEffect(), tilesAbsoluteX+width*this.X_RIGHT_PADDING, tilesAbsoluteY+width*this.Y_MIDDLE_PADDING)

        // console.log(`(${tilesAbsoluteX}, ${tilesAbsoluteY})`);
    }

    getPositionAsString(absoluteX, absoluteY){
        return `(${absoluteX + this.x}, ${absoluteY + this.y})`;
    }
  }