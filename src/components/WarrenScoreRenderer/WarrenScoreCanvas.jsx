import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import ShapeRepr from './ShapeRepr';

let x = 50;
let y = 50;

export default function WarrenScoreCanvas(props){

    let shapes = [];
    for(const index in props.shapes){
        console.log(props.shapes[index]);
        shapes.push(new ShapeRepr(props.shapes[index]));
    }

    //TODO: Maybe build in a dynamic renderer for the grid... Render items in the current scope... etc

    const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		let canvas = p5.createCanvas(p5.windowWidth - 50, p5.windowHeight - 150).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(255);
        renderGrid(p5);

        shapes.forEach((shape) => {
            shape.renderShape(p5, 100);
        })

        // renderShape(p5, shape)
        renderScore(p5);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		x++;
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

        for(let x = 0; x < p5.windowWidth; x+= 100){
            p5.line(x, 0, x, p5.windowHeight);
        }

        for(let y = 0; y < p5.windowHeight; y += 100){
            p5.line(0, y, p5.windowWidth, y);
        }
    }
}