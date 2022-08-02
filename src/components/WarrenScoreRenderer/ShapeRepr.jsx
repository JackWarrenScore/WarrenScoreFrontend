class ShapeRepr {
    constructor(tiles) {
        this.tiles = [];
        for(const index in tiles){
            this.tiles.push(tiles[index]);   
        }
    }
}