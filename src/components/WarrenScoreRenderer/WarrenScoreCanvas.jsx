import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import Sketch from "react-p5";

import ShapeRepr from './ShapeRepr';
import Point from './Point';

import * as CanvasConstants from './CanvasConstants.jsx';

let canvas;

let viewScale = 1;
let viewX = 0;
let viewY = 0;

let dragStatus = CanvasConstants.DEFAULT;

//We instantiate these outside the function so that they're accessible to the inner functions
let shapes = [];
let pointToTile = {};
let identityToShape = {};

let clickedTile = null;
let clickedShapeOriginalX = 0.0;
let clickedShapeOriginalY = 0.0;
let mouseXPosAtClick = 0.0;
let mouseYPosAtClick = 0.0;
let xDifference = 0.0;
let yDifference = 0.0;

function effectZoom(event) {
    const {x, y, deltaY} = event;
    const direction = deltaY > 0 ? -1 : 1;
    if(direction === 1) { viewScale += 0.2; }
    if(direction === -1 && viewScale > 0.5) { viewScale -= 0.2; }
}

function effectPan(p5){
    let tx = (p5.pmouseX - p5.mouseX) / viewScale;
    let ty = (p5.pmouseY - p5.mouseY) / viewScale;
    viewX += tx;
    viewY += ty;
}

export default function WarrenScoreCanvas(props){

    shapes = [];
    pointToTile = {};

    console.log("~~~~~~~~~~~~~~~~~~~~~HARD RESET~~~~~~~~~~~~~~~~~~~~~");

    for(const index in props.shapes){
        //This is a dogcrap way to instantiate your shapes. Just add your tiles manually like any other God fearing christian
        const identity = `${index}`
        const shape = new ShapeRepr(props.shapes[index], identity);

        identityToShape[identity] = shape;
        shape.getTiles().forEach((tile) => {
            const tilePosition = tile.getPositionAsString(shape.absoluteX, shape.absoluteY);
            pointToTile[tilePosition] = tile;
        });
        shapes.push(shape);
    }

    const setup = (p5, canvasParentRef) => {
		canvas = p5.createCanvas(p5.windowWidth - 30, p5.windowHeight - 130).parent(canvasParentRef);
        canvas.mouseWheel(e => effectZoom(e))
        p5.background(255);

        canvas.mousePressed(() => {

            let x = parseInt((p5.mouseX/viewScale + viewX)/CanvasConstants.TILE_WIDTH)*100;
            let y = parseInt((p5.mouseY/viewScale + viewY)/CanvasConstants.TILE_WIDTH)*100;
            let mouseLocation = new Point(x,y);

            if(mouseLocation.toString() in pointToTile){
                clickedTile = pointToTile[mouseLocation.toString()];

                //Intuitively, it doesn't make sense that we would need to scale this. I think this is good as is.
                xDifference = p5.mouseX - clickedTile.getParentRef().absoluteX;
                yDifference = p5.mouseY - clickedTile.getParentRef().absoluteY;

                dragStatus = CanvasConstants.DRAGGING_PIECE                
            }
            else {
                dragStatus = CanvasConstants.DRAGGING_WORLD;
            }
        })

        canvas.mouseMoved(() => {
            if(dragStatus === CanvasConstants.DRAGGING_WORLD) {
                effectPan(p5);
            }
            if(dragStatus === CanvasConstants.DRAGGING_PIECE) {
                console.log("Dragging.")
                const selectedShape = identityToShape[clickedTile.getParentRef().getId()];

                //TODO: This is the ratfink code that needs to change.
                const dragLocaleX = (p5.mouseX - xDifference);
                const dragLocaleY = (p5.mouseY - yDifference);

                selectedShape.absoluteX = dragLocaleX
                selectedShape.absoluteY = dragLocaleY
            }
        })

        canvas.mouseReleased(() => {
            // clickedTile = pointToTile[mouseLocation.toString()];
            // clickedTileOriginalPosition = clickedTile.getPositionAsString()

            dragStatus = CanvasConstants.DEFAULT;
        })

	};

	const draw = (p5) => {
		p5.background(255);
        renderScore(p5);

        p5.scale(viewScale);
        p5.translate(-viewX, -viewY);

        renderGrid(p5);
        renderShapes(p5);
	};

    return(
        <div>
            <Sketch setup={setup} draw={draw} />
        </div>
    )

    function renderShapes(p5){
        shapes.forEach((shape) => {
            shape.renderShape(p5, CanvasConstants.TILE_WIDTH);
        })
    }

    function renderScore(p5){
        p5.fill(0, 0, 0);
        p5.textSize(32);
        p5.text('Score: 0', 10, 30);
    }

    function renderGrid(p5){

        p5.fill('black')
        for(let x = 0; x < p5.windowWidth; x+=CanvasConstants.TILE_WIDTH){
          for(let y = 0; y < p5.windowHeight; y+=CanvasConstants.TILE_WIDTH){
            p5.line(0, y, p5.windowWidth, y)
            p5.textSize(15)
            p5.text(`(${x/CanvasConstants.TILE_WIDTH}, ${y/CanvasConstants.TILE_WIDTH})`, x+40, y+40);
          }
          p5.line(x, 0, x, p5.windowHeight)
        }
    }
}