import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import ShapeRepr from './ShapeRepr';

export default function WarrenScoreCanvas(props){

    let shapes = [];
    for(const index in props.shapes){
        console.log(props.shapes[index]);
        shapes.push(new ShapeRepr(props.shapes[index]));
    }

    const setup = (p5, canvasParentRef) => {
		let canvas = p5.createCanvas(p5.windowWidth - 50, p5.windowHeight - 150).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(255);
        renderGrid(p5);

        shapes.forEach((shape) => {
            shape.renderShape(p5, 100);
        })

        renderScore(p5);
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