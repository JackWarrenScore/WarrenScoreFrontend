class ShapeRepr {
    constructor(shapeInfo) {
        const colors = ['#FAFF00', '#9AD2CB', '#A8B3C1', '#B594B6', '#D7EBBA', '#FAA916', '#F79256', '#FEFFBE', '#F19A3E', '#EBD494']
        const randomColor = colors[Math.floor(Math.random()*colors.length)];
        
        this.tiles = [];
        this.absoluteX = shapeInfo.absoluteX;
        this.absoluteY = shapeInfo.absoluteY;

        for(const index in shapeInfo.tiles){
            const tile = shapeInfo.tiles[index];
            tile.setColor(randomColor)
            this.tiles.push(tile);   
        }
    }
}