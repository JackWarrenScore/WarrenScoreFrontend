import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import ShapeRepr from './ShapeRepr';
import PanAndZoom from './PanAndZoom';

let panAndZoom;
let outsideP5;

let TILE_SIZE = 100;
function cleanPosition(value){
    return Math.floor(value/TILE_SIZE);
}


export default function WarrenScoreCanvas(props){

    let canvas;

    let shapes = [];
    for(const index in props.shapes){
        shapes.push(new ShapeRepr(props.shapes[index]));
    }

    const setup = (p5, canvasParentRef) => {
        // outsideP5 = p5;
        panAndZoom = new PanAndZoom(p5);
		canvas = p5.createCanvas(p5.windowWidth - 50, p5.windowHeight - 150).parent(canvasParentRef);
        canvas.mouseWheel(e => panAndZoom.worldZoom(e));


        canvas.mousePressed(() => {
            panAndZoom.mousePressed(p5.mouseX, p5.mouseY);
        })

        canvas.mouseMoved(() => {
            panAndZoom.mouseDragged(p5.mouseX, p5.mouseY);
        })

        canvas.mouseReleased(() => {
            panAndZoom.mouseReleased();
        })

	};

    // console.log(outsideP5);
    // outsideP5.window.mousePressed(e => panAndZoom.mousePressed(e));


	const draw = (p5) => {
		p5.background(255);
        panAndZoom.scale();
        panAndZoom.translate();

        renderGrid(p5);
        renderScore(p5);
        

        shapes.forEach((shape) => {
            shape.renderShape(p5, 100);
        })

	};

    return(
        <div>
            <Sketch setup={setup} draw={draw} />
        </div>
    )

    function renderScore(p5){
        p5.fill(0, 0, 0);
        p5.textSize(32);
        p5.text('Score: 0', 10, 30);
    }

    function renderGrid(p5){
        p5.fill(255, 255, 255);

        const LEFT_X = -5000;
        const RIGHT_X = 5000;
        const UPPER_Y = -5000;
        const LOWER_Y = 5000;



        for(let x = LEFT_X; x < RIGHT_X; x += 100){
            p5.line(x, UPPER_Y, x, LOWER_Y);
        }

        for(let y = UPPER_Y; y < LOWER_Y; y += 100){
            p5.line(LEFT_X, y, RIGHT_X, y);
        }
    }
}