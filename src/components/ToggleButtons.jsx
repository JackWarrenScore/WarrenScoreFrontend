import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

export default function ToggleButtons(props) {
    const [radioValue, setRadioValue] = useState('1');

    const radios = props.controls;
    const currentState = props.currentState;
    const setCurrentState = props.updateState;

    function updateDataFromPack(dataPack) {
        let currentStateCopy = JSON.parse(JSON.stringify(currentState));
        for(const [key, value] of Object.entries(dataPack)){
            
            currentStateCopy[key] = value;
            setCurrentState(currentStateCopy);
        }
    }

    function clickHandler(e, dataPack) {
        setRadioValue(e.currentTarget.value)
        updateDataFromPack(dataPack)
    }

    return (       
        <ButtonGroup>
            {radios.map((radio, idx) => (
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 5 ? radio.variantOutline : radio.variant}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => clickHandler(e, radio.dataToBeModified)}
                >
                
                {radio.name}
            
            </ToggleButton>
            
            ))}
      </ButtonGroup>
    )
}