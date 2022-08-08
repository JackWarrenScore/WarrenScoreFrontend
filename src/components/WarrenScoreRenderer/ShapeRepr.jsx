import TileRepr from "./TileRepr";

export default class ShapeRepr {
    constructor(shapeInfo) {
        const colors = ['#FAFF00', '#9AD2CB', '#A8B3C1', '#B594B6', '#D7EBBA', '#FAA916', '#F79256', '#FEFFBE', '#F19A3E', '#EBD494', '#A5FFD6', '#C5D9E2', '#B3B5BB', '#BBA0CA',
                        '#C2E7DA', '#F1FFE7', '#FDD692', '#FFD6BA', '#F7A072', '#E1CA96', '#ACA885', '#8FCB9B', '#EAFDCF', '#FFFC99', '#DECBB7', '#41E2BA', '#F7E733', '#A1C181']
        this.randomColor = colors[Math.floor(Math.random()*colors.length)];
        this.tiles = [];
        this.absoluteX = shapeInfo.x;
        this.absoluteY = shapeInfo.y;

        for(const index in shapeInfo.tiles){
            const tile = new TileRepr(shapeInfo.tiles[index]);
            tile.setColor(this.randomColor)
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