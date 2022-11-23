import TopMenu from "../components/TopMenu"
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import WarrenScoreCanvas from "../components/WarrenScoreRenderer/WarrenScoreCanvas";

export default function Demo(){

    const [testData, setTestData] = useState([]);

    function getAptitudeTest() {
        axios.post('http://localhost:3000/get-demo-test', {})
        .then(function (response){
            setTestData(response.data);
        })
        
    }
    
    useEffect(() => getAptitudeTest(), []);

    return(
        <div>
            <TopMenu/>
            <h1>Demo page!</h1>        
            <WarrenScoreCanvas shapes={testData}/>
        </div>
    )
}