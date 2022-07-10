import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Button from 'react-bootstrap/Button';

export default function PlusMinusButton(props){

    const state = props.state;
    const keyName = props.keyName;

    function plusOne(){
        props.update(keyName, state[keyName] + 1);
    }

    function minusOne(){
        if(state[keyName] > 0) {
            props.update(keyName, state[keyName] - 1);
        }
    }

    return(
        <div>
            <Button variant="primary" onClick={() => minusOne()}>-</Button>
            <Button variant="danger">{props.keyName}</Button>
            <Button variant="primary" onClick={() => plusOne()}>+</Button>
            {state[keyName]}
        </div>
    )
}