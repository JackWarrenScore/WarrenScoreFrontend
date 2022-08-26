import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";

import ShapeRepr from './ShapeRepr';
import PanAndZoom from './PanAndZoom';
import MouseRepr from './MouseRepr';

let panAndZoom;
let canvas;
let mouse;

let pointToTile = {};

let TILE_SIZE = 100;
function convertCanvasPositionToGridPositionWithPan(p5, controls){
    const canvasX = p5.mouseX;
    const canvasY = p5.mouseY;

    const controlsX = controls.view.x;
    const controlsY = controls.view.y;
    
    const gridX = Math.floor((canvasX-controlsX)/TILE_SIZE);
    const gridY = Math.floor((canvasY-controlsY)/TILE_SIZE);

    console.log(`Pan says: (${gridX}, ${gridY})`);
    
    return (gridX, gridY);
}

function convertCanvasPositionToGridPositionWithZoom(p5, controls, e){
    const {x, y, deltaY} = e;
    const direction = deltaY > 0 ? -1 : 1;
    const factor = 0.05;
    const zoom = 1 * direction * factor;
  
    const wx = (p5.mouseX-controls.view.x)/(p5.width*controls.view.zoom);
    const wy = (p5.mouseY-controls.view.y)/(p5.height*controls.view.zoom);
  
    const gridX = Math.floor((controls.view.y - wy*p5.height*zoom)/TILE_SIZE);
    const gridY = Math.floor((controls.view.x - wx*p5.width*zoom)/TILE_SIZE);
    const newZoom = controls.view.zoom + zoom;
    
    console.log(`Zoom says: (${Math.floor(gridX)}, ${Math.floor(gridY)})`);

    return (gridX, gridY);
}


export default function WarrenScoreCanvas(props){

    let shapes = [];
    for(const index in props.shapes){
        const shape = new ShapeRepr(props.shapes[index]);
        shape.getTiles().forEach((tile) => {
            const tilePosition = tile.getPositionAsString(shape.absoluteX, shape.absoluteY);
            pointToTile[tilePosition] = tile;
        });
        shapes.push(shape);
    }


    const setup = (p5, canvasParentRef) => {
        panAndZoom = new PanAndZoom(p5);
        mouse = new MouseRepr(p5);
		canvas = p5.createCanvas(p5.windowWidth - 50, p5.windowHeight - 150).parent(canvasParentRef);
        canvas.mouseWheel(e => {            
            panAndZoom.worldZoom(e)
            const gridPosition = convertCanvasPositionToGridPositionWithZoom(p5, panAndZoom.controls, e);
        });

        canvas.mousePressed(() => {
            panAndZoom.mousePressed(p5.mouseX, p5.mouseY);
            const gridPosition = convertCanvasPositionToGridPositionWithPan(p5, panAndZoom.controls)
            // console.log(`Zooming: (${p5,mouseX- panAndZoom.controls.view.x}, ${})`);
        })

        canvas.mouseMoved(() => {
            panAndZoom.mouseDragged(p5.mouseX, p5.mouseY);
            // mouse.moveMouse(p5.mouseX, p5.mouseY, panAndZoom.controls.view.x, panAndZoom.controls.view.y);
        })

        canvas.mouseReleased(() => {
            panAndZoom.mouseReleased();
        })

	};

	const draw = (p5) => {
		p5.background(240);
        renderScore(p5);

        panAndZoom.scale();
        panAndZoom.translate();

        renderGrid(p5);
        renderShapes(p5);
        renderMouse();
	};

    return(
        <div>
            <Sketch setup={setup} draw={draw} />
        </div>
    )

    function renderShapes(p5){
        shapes.forEach((shape) => {
            shape.renderShape(p5, TILE_SIZE);
        })
    }

    function renderScore(p5){
        p5.fill(0, 0, 0);
        p5.textSize(32);
        p5.text('Score: 0', 10, 30);
    }

    function renderGrid(p5){
        p5.fill(255, 255, 255);

        const SCALE = 100;

        for(let x = -5; x <= 5; x += 1){
            p5.line(x*SCALE, -5*SCALE, x*SCALE, 5*SCALE);
        }

        for(let y = -5; y <= 5; y += 1){
            p5.line(-5*SCALE, y*SCALE, 5*SCALE, y*SCALE);
        }
    }

    function renderMouse(){
        mouse.renderMouse();
    }
}