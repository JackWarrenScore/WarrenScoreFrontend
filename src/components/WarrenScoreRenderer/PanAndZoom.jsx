

export default class TileRepr {
    constructor(p5) {
        this.p5 = p5;

        this.controls = {
            view: {x: 0, y: 0, zoom: 1},
            viewPos: { prevX: null,  prevY: null,  isDragging: false },
        }
    }

    scale(){
        this.p5.scale(this.controls.view.zoom);
    }

    worldZoom(e) {
        const {x, y, deltaY} = e;
        const direction = deltaY > 0 ? -1 : 1;
        const factor = 0.05;
        const zoom = 1 * direction * factor;
      
        const wx = (x-this.controls.view.x)/(this.p5.width*this.controls.view.zoom);
        const wy = (y-this.controls.view.y)/(this.p5.height*this.controls.view.zoom);
      
        this.controls.view.y -= wy*this.p5.height*zoom;
        this.controls.view.x -= wx*this.p5.width*zoom;
        this.controls.view.zoom += zoom;
    }

    translate(){
        this.p5.translate(this.controls.view.x, this.controls.view.y);
    }

    handleMousePressedOrDragged(x, y) {
        if(this.controls.viewPos.isDragging){
            this.mouseDragged(x,y);
        } else {
            this.mousePressed(x,y);
        }
    }

    mousePressed(x, y) {
        console.log("Mouse Pressed!");
        this.controls.viewPos.isDragging = true;
        this.controls.viewPos.prevX = x;
        this.controls.viewPos.prevY = y;
    }

    mouseDragged(x, y) {
        const {prevX, prevY, isDragging} = this.controls.viewPos;
        if(!isDragging) return;

        console.log("Mouse is being dragged!");
        const pos = {x: x, y: y};
        const dx = pos.x - prevX;
        const dy = pos.y - prevY;

        if(prevX || prevY) {
            this.controls.view.x += dx;
            this.controls.view.y += dy;
            this.controls.viewPos.prevX = pos.x;
            this.controls.viewPos.prevY = pos.y;
        }
    }

    mouseReleased() {
        console.log("Mouse Released!");
        this.controls.viewPos.isDragging = false;
        this.controls.viewPos.prevX = null;
        this.controls.viewPos.prevY = null;
    }
}