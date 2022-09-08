import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function PresetMenu(props){
    let {state, setState} = props;

    //TODO: Add random generation preset bounds according to role and tier
    function generatePresetForRole(testLength, shapeMaxSize, modifierFunction, radiusMax, scoreType){
        let stateCopy = JSON.parse(JSON.stringify(state));
        stateCopy['test_length'] = testLength;
        stateCopy['shape_max_size'] = shapeMaxSize;
        stateCopy['undefined_modifier_amount'] = Math.ceil(modifierFunction(4));
        stateCopy['plus_modifier_amount'] = Math.ceil(modifierFunction(3));
        stateCopy['times_modifier_amount'] = Math.ceil(modifierFunction(2));
        stateCopy['power_modifier_amount'] = Math.ceil(modifierFunction(1));
        stateCopy['radius_maximum'] = radiusMax;
        stateCopy['score_type'] = scoreType;

        setState(stateCopy);
    }

    function nullFunction(score){ return score; }

    function analystFormula(score){ return 2*score+1; }

    function managerFormula(score){ return (2/7)*score+1; }

    function developerFormula(score) { return (-2/3)*score+5; }

    function architectFormula(score) { return (-1*((score*score)/5))+5; }

    return (
        <div>
            <Button style={{ 'backgroundColor' : '#FF784F', 'outline': 'none' }} onClick={() => generatePresetForRole(3, 1, nullFunction, 1, 'MAX')}>Custom</Button>
            <Button style={{ 'backgroundColor' : '#77685D' }} onClick={() => generatePresetForRole(5, 3, analystFormula, 5, 'MAX')}>Analyst</Button>
            <Button style={{ 'backgroundColor' : '#AE847E' }} onClick={() => generatePresetForRole(7, 4, managerFormula, 5, 'MIN')}>Manager</Button>
            <Button style={{ 'backgroundColor' : '#E94F37' }} onClick={() => generatePresetForRole(7, 5, developerFormula, 7, 'MAX')}>Developer</Button>
            <Button style={{ 'backgroundColor' : '#885053' }} onClick={() => generatePresetForRole(10, 4, architectFormula, 10, 'MIN')}>Architect</Button>
        </div>
    );
}