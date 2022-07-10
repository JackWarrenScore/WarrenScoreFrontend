import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Button from 'react-bootstrap/Button';

import TopMenu from "../../components/TopMenu"
import ToggleButtons from '../../components/ToggleButtons';
import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import RangeSlider from 'react-bootstrap-range-slider';
import PlusMinusButton from '../../components/PlusMinusButton';

export default function CampaignConfigGenerator(){

    function generateConfigPreset(shapeMaxSize, plusModifier, timesModifier, powerModifier, undefinedModifier){
        return {
            SHAPE_MAX: shapeMaxSize,
            "+": plusModifier,
            "*": timesModifier,
            "^": powerModifier,
            "u": undefinedModifier
        }
    }

    const rolePresetData = [
        {
            'name': 'Custom', 'value':'1', 'variant': "secondary", 'variantOutline': "outline-secondary", 
            'dataToBeModified': generateConfigPreset(1, 0, 0, 0, 0)    
        },
        {
            'name': 'Manager', 'value':'2', 'variant': "success", 'variantOutline': "outline-success",
            'dataToBeModified': generateConfigPreset(1, 1, 1, 0, 2)
        },
        {
            'name': 'Analyst', 'value':'3', 'variant': "warning", 'variantOutline': "outline-warning",
            'dataToBeModified': generateConfigPreset(1, 1, 2, 0, 0)
        },
        {
            'name': 'Developer', 'value':'4', 'variant': "danger", 'variantOutline': "outline-danger",
            'dataToBeModified': generateConfigPreset(3, 0, 1, 2, 1)
        },
        {
            'name': 'Architect', 'value':'5', 'variant': "info", 'variantOutline': "outline-info",
            'dataToBeModified': generateConfigPreset(5, 1, 2, 3, 0)
        }
    ]

    const { campaignId } = useParams();
    let navigate = useNavigate();

    const [campaignInfo, setCampaignInfo] = useState({
        TITLE:"A pretty sick title.",
        DESCRIPTION:"A really rad description",
        SHAPE_MAX:1,
        "+":0,
        "*":0,
        "^":0,
        "u":0
    });

    //TODO: Send data to backend
    function saveAndContinue() {
        console.log(campaignInfo)
        navigate(`../campaigns/${campaignId}/campaign-mailing-list`)
    }

    function updateKeyByValue(keyForNewValue, newValue){
        let campaignInfoCopy = JSON.parse(JSON.stringify(campaignInfo));
        campaignInfoCopy[keyForNewValue] = newValue;
        setCampaignInfo(campaignInfoCopy);
    }

    return (
        <div>
            <TopMenu />
            <h1 className="text-center">Customize your campaign</h1>
            <div className="text-center">
                <input type="text" style={{"maxWidth":"50%"}} className="form-control" placeholder={campaignInfo.TITLE} 
                    onChange={(e) => updateKeyByValue("TITLE", e.target.value)}></input>
                <br/>
                <ToggleButtons currentState={campaignInfo} updateState={setCampaignInfo} controls={rolePresetData}/>
            </div>
            <br/>

                <div style={{width: 25 + '%'}}>
                    {"Max Shape Size: "}
                    <RangeSlider
                        min={1}
                        max={7}
                        value={campaignInfo.SHAPE_MAX}
                        onChange={e => updateKeyByValue("SHAPE_MAX", e.target.value)}
                        tooltipLabel={currentValue => `${currentValue}`}
                        tooltip='on'
                    />
                </div>

                <div>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"+"}/>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"*"}/>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"^"}/>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"u"}/>
                </div>


                <Button variant="primary" onClick={() => saveAndContinue()}>Save And Continue</Button>
        </div>
    )
}