import * as CanvasConstants from './CanvasConstants.jsx';

export default class TileRepr {
    constructor(tileData, shapeRef) {

        this.shapeRef = shapeRef;

        this.x = tileData.x*CanvasConstants.TILE_WIDTH;
        this.y = tileData.y*CanvasConstants.TILE_WIDTH;
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
    getParentRef() { return this.shapeRef; }

    renderTile(p5, absoluteX, absoluteY){

        const tilesAbsoluteX = (absoluteX + this.x)
        const tilesAbsoluteY = (absoluteY + this.y)

        p5.fill(p5.color(this.color))
        p5.square(tilesAbsoluteX, tilesAbsoluteY, CanvasConstants.TILE_WIDTH);
        
        p5.fill(p5.color(0, 0, 0))
        p5.textSize(20);
        p5.text(this.getValue(), tilesAbsoluteX+CanvasConstants.TILE_WIDTH*this.X_MIDDLE_PADDING, tilesAbsoluteY+CanvasConstants.TILE_WIDTH*this.Y_MIDDLE_PADDING)

        p5.text(this.getUpEffect(), tilesAbsoluteX+CanvasConstants.TILE_WIDTH*this.X_MIDDLE_PADDING, tilesAbsoluteY+CanvasConstants.TILE_WIDTH*this.Y_UP_PADDING)
        p5.text(this.getLeftEffect(), tilesAbsoluteX+CanvasConstants.TILE_WIDTH*this.X_LEFT_PADDING, tilesAbsoluteY+CanvasConstants.TILE_WIDTH*this.Y_MIDDLE_PADDING)
        p5.text(this.getDownEffect(), tilesAbsoluteX+CanvasConstants.TILE_WIDTH*this.X_MIDDLE_PADDING, tilesAbsoluteY+CanvasConstants.TILE_WIDTH*this.Y_DOWN_PADDING)
        p5.text(this.getRightEffect(), tilesAbsoluteX+CanvasConstants.TILE_WIDTH*this.X_RIGHT_PADDING, tilesAbsoluteY+CanvasConstants.TILE_WIDTH*this.Y_MIDDLE_PADDING)
    }
    
    getPositionAsString(){
        return `(${this.shapeRef.absoluteX + this.x}, ${this.shapeRef.absoluteY + this.y})`;
    }
  }