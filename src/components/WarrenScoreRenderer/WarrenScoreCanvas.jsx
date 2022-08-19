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
function convertCanvasPositionToGridPosition(x, y){
    return `(${Math.floor(x)}, ${Math.floor(y)})`;
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
        });

        canvas.mousePressed(() => {
            const gridPosition = convertCanvasPositionToGridPosition(panAndZoom.controls.view.x / p5.mouseX,  panAndZoom.controls.view.x / p5.mouseY);
            panAndZoom.mousePressed(p5.mouseX, p5.mouseY);
            //TODO: This is working correctly. Move forward with this impl
            console.log(`The mouse grid position is: (${Math.floor((p5.mouseX-panAndZoom.controls.view.x)/100)}, ${Math.floor((p5.mouseY-panAndZoom.controls.view.y)/100)})`)
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