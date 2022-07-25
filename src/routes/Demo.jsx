import TopMenu from "../components/TopMenu"
import Sketch from "react-p5";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

let x = 50;
let y = 50;

export default function Demo(){

    const [testData, setTestData] = useState([]);

    function getAptitudeTest() {
        axios.post('http://localhost:3000/machine-test', {})
        .then(function (response){
            console.log(response);
        })
    }

    useEffect(() => getAptitudeTest(), []);

    const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(p5.windowWidth, 500).parent(canvasParentRef);
	};

	const draw = (p5) => {
		p5.background(0);
		p5.ellipse(x, y, 70, 70);
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes
		x++;
	};

    return(
        <div>
            <TopMenu />
            <h1>Demo page!</h1>        
            <Sketch setup={setup} draw={draw} />
        </div>
    )
}