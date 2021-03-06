import TopMenu from "../components/TopMenu"
import Sketch from "react-p5";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import WarrenScoreCanvas from "../components/WarrenScoreRenderer/WarrenScoreCanvas";

let x = 50;
let y = 50;

export default function Demo(){

    const [testData, setTestData] = useState([]);

    function getAptitudeTest() {
        axios.post('http://localhost:3000/get-demo-test', {})
        .then(function (response){
            console.log(response);
        })
    }

    useEffect(() => getAptitudeTest(), []);

    return(
        <div>
            <h1>Demo page!</h1>        
            <WarrenScoreCanvas />
        </div>
    )
}