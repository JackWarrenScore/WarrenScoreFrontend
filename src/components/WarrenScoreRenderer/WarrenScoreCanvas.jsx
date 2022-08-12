import React, { useState, useEffect } from 'react';
import Sketch from "react-p5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import ShapeRepr from './ShapeRepr';

let circles = [];

const controls = {
    view: {x: 0, y: 0, zoom: 1},
    viewPos: { prevX: null,  prevY: null,  isDragging: false },
}

export default function WarrenScoreCanvas(props){

    let canvas;

    class Circle {
        constructor(p5){
            this.p5 = p5;
            this.x = p5.random(-500, p5.width + 500);
            this.y = p5.random(-500, p5.height + 500);
        }

        renderCircle(p5){
            p5.fill(55);
            p5.noStroke();
            p5.ellipse(this.x, this.y, 50, 50);
        }
    }

      function worldZoom(e, p5) {
        const {x, y, deltaY} = e;
        const direction = deltaY > 0 ? -1 : 1;
        console.log(direction, deltaY)
        const factor = 0.05;
        const zoom = 1 * direction * factor;
      
        const wx = (x-controls.view.x)/(p5.width*controls.view.zoom);
        const wy = (y-controls.view.y)/(p5.height*controls.view.zoom);
      
        controls.view.x -= wx*p5.width*zoom;
        controls.view.y -= wy*p5.height*zoom;
        controls.view.zoom += zoom;

        console.log(controls.view.zoom)
      }

    

    // let shapes = [];
    // for(const index in props.shapes){
    //     shapes.push(new ShapeRepr(props.shapes[index]));
    // }

    const setup = (p5, canvasParentRef) => {
        console.log("SETUP");
		canvas = p5.createCanvas(p5.windowWidth - 50, p5.windowHeight - 150).parent(canvasParentRef);
        canvas.mouseWheel(e => worldZoom(e, p5))
        for(let i = 0; i < 50; i++){
            circles.push(new Circle(p5))
        }
	};


	const draw = (p5) => {
		p5.background(255);
        p5.scale(controls.view.zoom)
        circles.forEach(circle => {
            circle.renderCircle(p5)
        });

        renderGrid(p5);
        renderScore(p5);
        

        // shapes.forEach((shape) => {
        //     shape.renderShape(p5, 100);
        // })

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

        for(let x = 0; x < 1000; x+= 100){
            p5.line(x, 0, x, 1000);
        }

        for(let y = 0; y < 1000; y += 100){
            p5.line(0, y, 1000, y);
        }
    }
}