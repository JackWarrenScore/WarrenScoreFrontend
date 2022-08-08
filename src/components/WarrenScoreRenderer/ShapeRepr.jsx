import TileRepr from "./TileRepr";

export default class ShapeRepr {
    constructor(shapeInfo) {
        const colors = ['#FAFF00', '#9AD2CB', '#A8B3C1', '#B594B6', '#D7EBBA', '#FAA916', '#F79256', '#FEFFBE', '#F19A3E', '#EBD494']
        const randomColor = colors[Math.floor(Math.random()*colors.length)];
        this.tiles = [];
        this.absoluteX = shapeInfo.x;
        this.absoluteY = shapeInfo.y;

        for(const index in shapeInfo.tiles){
            const tile = new TileRepr(shapeInfo.tiles[index]);
            tile.setColor(randomColor)
            this.tiles.push(tile);   
        }
    }

    renderShape(p5, length){
        p5.fill(100, 100, 100);
        this.tiles.forEach((tile) => {
            tile.renderTile(p5, length, this.absoluteX, this.absoluteY);
        })
    }
}