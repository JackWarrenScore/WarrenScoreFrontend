import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function PresetMenu(props){
    let {update} = props;

    //TODO: Add random generation preset bounds according to role and tier
    function generatePresetForRole(testLength, shapeMaxSize, modifierFunction, radiusMax, scoreType){
        update('test_length', testLength);
        update('shape_max_size', shapeMaxSize);
        update('undefined_modifier_amount', modifierFunction(4));
        update('plus_modifier_amount', modifierFunction(3));
        update('times_modifier_amount', modifierFunction(2));
        update('power_modifier_amount', modifierFunction(1));
        update('radius_maximum', radiusMax);
        update('score_type', scoreType);
    }

    function nullFunction(score){
        return score;
    }

    function easy(score){
        return 2*score+1;
    }

    return (
        <div>


            <Button style={{ 'background-color' : '#FF784F' }} onClick={() => generatePresetForRole(3, 2, )}>Custom</Button>
            <Button style={{ 'background-color' : '#77685D' }}>Analyst</Button>
            <Button style={{ 'background-color' : '#AE847E' }}>Manager</Button>
            <Button style={{ 'background-color' : '#E94F37' }}>Developer</Button>
            <Button style={{ 'background-color' : '#885053' }}>Architect</Button>
        </div>
    );
}