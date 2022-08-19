export default class MouseRepr {
    constructor(p5) {
        this.p5 = p5;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    moveMouse(canvasX, canvasY, transformX, transformY){
        this.mouseX = (canvasX - transformX);
        this.mouseY = (canvasY - transformY);
    }

    scaleMouse(){
        //KIND OF DUPLICATE THE RENDER METHOD FOR SCALE FUNCTIONALITY.
    }

    renderMouse(){
        this.p5.fill(this.p5.color(0, 0, 0));
        this.p5.square(this.mouseX, this.mouseY, 10);
        console.log(this.mouseX, this.mouseY)

        //THIS WORKS FOR MOVING, BUT NOT WITH SCALING.
        //NEXT STEPS: DO I NEED TO HAVE THIS AS IT'S OWN REPR?
        //NEED TO FIX WITH SCALING WITH THE POSITION.
    }
  }