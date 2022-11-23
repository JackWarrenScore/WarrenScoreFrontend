import TileRepr from "./TileRepr";
import * as CanvasConstants from './CanvasConstants.jsx';

export default class ShapeRepr {
    constructor(shapeInfo, id) {
        const colors = ['#FAFF00', '#9AD2CB', '#A8B3C1', '#B594B6', '#D7EBBA', '#FAA916', '#F79256', '#FEFFBE', '#F19A3E', '#EBD494', '#A5FFD6', '#C5D9E2', '#B3B5BB', '#BBA0CA',
                        '#C2E7DA', '#F1FFE7', '#FDD692', '#FFD6BA', '#F7A072', '#E1CA96', '#ACA885', '#8FCB9B', '#EAFDCF', '#FFFC99', '#DECBB7', '#41E2BA', '#F7E733', '#A1C181']
                        this.randomColor = colors[Math.floor(Math.random()*colors.length)];
        this.tiles = [];
        this.absoluteX = shapeInfo.x*CanvasConstants.TILE_WIDTH;
        this.absoluteY = shapeInfo.y*CanvasConstants.TILE_WIDTH;
        this.id = id;

        for(const index in shapeInfo.tiles){
            const tile = new TileRepr(shapeInfo.tiles[index], this);
            tile.setColor(this.randomColor)
            this.tiles.push(tile);   
        }
    }

    renderShape(p5, length){
        p5.fill(100, 100, 100);
        this.tiles.forEach((tile) => {
            tile.renderTile(p5, this.absoluteX, this.absoluteY);
        })
    }

    getId(){
        return this.id;
    }

    getTiles(){
        return this.tiles;
    }
}