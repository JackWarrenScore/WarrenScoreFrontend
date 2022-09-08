import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import React from 'react';
import { Button } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
;

export default function ConfigCard(props){
    let {state, updateState, stateKey} = props;
    let {title, min, max} = props;

    console.log('State: ', state)

    return (
        <div>
            <Card style={{ width: '10rem' }}>
                <Card.Body style={{'textAlign': 'center'}}>
                    <Card.Title style={{ 'fontSize': '80px'}}>{state[stateKey]}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
                    <RangeSlider min={min} max={max} value={state[stateKey]} onChange={changeEvent => updateState(stateKey, changeEvent.target.value)}
    />
                </Card.Body>
            </Card>
        </div>
    );
}