import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

import TopMenu from "../../components/TopMenu"
import PlusMinusButton from '../../components/PlusMinusButton';
import ToggleButtons from '../../components/ToggleButtons';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import axios from 'axios';

export default function CampaignConfigGenerator(){

    const { campaignId } = useParams();
    let navigate = useNavigate();

    const rolePresetData = [
        {
            'name': 'Custom', 'value':'1', 'variant': "secondary", 'variantOutline': "outline-secondary", 
            'dataToBeModified': generateConfigPreset(1, 1, 0, 0, 0, 0, 5, "MAX")
        },
        {
            'name': 'Manager', 'value':'2', 'variant': "success", 'variantOutline': "outline-success",
            'dataToBeModified': generateConfigPreset(1, 3, 1, 1, 0, 2, 3, "MAX")
        },
        {
            'name': 'Analyst', 'value':'3', 'variant': "warning", 'variantOutline': "outline-warning",
            'dataToBeModified': generateConfigPreset(1, 5, 1, 2, 0, 0, 5, "MAX")
        },
        {
            'name': 'Developer', 'value':'4', 'variant': "danger", 'variantOutline': "outline-danger",
            'dataToBeModified': generateConfigPreset(3, 5, 0, 1, 2, 1, 5, "MAX")
        },
        {
            'name': 'Architect', 'value':'5', 'variant': "info", 'variantOutline': "outline-info",
            'dataToBeModified': generateConfigPreset(5, 7, 1, 2, 3, 0, 10, "MIN")
        }
    ]


    //TODO: Reimplement Test Length

    const [campaignInfo, setCampaignInfo] = useState({
        TITLE:"A pretty sick title.",
        DESCRIPTION:"A really rad description",
        TEST_LENGTH: 0,
        SHAPE_MAX:1,
        "+":0,
        "*":0,
        "^":0,
        "u":0,
        "RADIUS_MAX":1,
        "SCORE_TYPE":"MAX"
    });

    useEffect(() => loadSpecificConfig(), []);

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

                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"TEST_LENGTH"}/>

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

                <div style={{"margin": "auto", "width": "75" + "%"}}>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"+"}/>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"*"}/>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"^"}/>
                    <PlusMinusButton state={campaignInfo} update={updateKeyByValue} keyName={"u"}/>
                </div>

                <div style={{width: 25 + '%'}}>
                    Radius Range Max:
                        <RangeSlider
                            min={1}
                            max={10}
                            value={campaignInfo.RADIUS_MAX}
                            onChange={e => updateKeyByValue("RADIUS_MAX", e.target.value)}
                            tooltipLabel={currentValue => `${currentValue}`}
                            tooltip='on'
                        />
                </div>

                <div>
                    <Button variant="warning" onClick={() => updateKeyByValue("SCORE_TYPE", "MAX")}>Max Score</Button>
                    <Button variant="success" onClick={() => updateKeyByValue("SCORE_TYPE", "MIN")}>Min Score</Button>
                    <p>Current Win Condition: {campaignInfo.SCORE_TYPE}</p>
                </div>

                <br/>
                <Button variant="primary" onClick={() => saveAndContinue()}>Save And Continue</Button>
        </div>
    )

    function loadSpecificConfig() {
        axios.post('http://localhost:3000/get-config', { campaignId: campaignId })
            .then(function(response) {
                const data = response.data;

                if(data !== ''){
                    setCampaignInfo({
                        TITLE: data.title,
                        DESCRIPTION: data.description,
                        TEST_LENGTH: data.test_length,
                        SHAPE_MAX: data.shape_max_size,
                        "+": data.plus_modifier_amount,
                        "*": data.times_modifier_amount,
                        "^": data.power_modifier_amount,
                        "u": data.undefined_modifier_amount,
                        "RADIUS_MAX": data.radius_maximum,
                        "SCORE_TYPE":data.score_type
                    })
                }
            })
    }

    function generateConfigPreset(shapeMaxSize, testLength, plusModifier, timesModifier, powerModifier, undefinedModifier, radiusMax, scoreType){
        return {
            TITLE: 'A thouroghly challenging template',
            DESCRIPTION: 'Very interesting description',
            TEST_LENGTH: testLength,
            SHAPE_MAX: shapeMaxSize,
            "+": plusModifier,
            "*": timesModifier,
            "^": powerModifier,
            "u": undefinedModifier,
            "RADIUS_MAX": radiusMax,
            "SCORE_TYPE": scoreType
        }
    }

    function saveAndContinue() {
        axios.post('http://localhost:3000/upsert-campaign-config', 
            {
                "campaignId": campaignId,
                "configData": campaignInfo
            }
        )
        .then(function (response){
            console.log(response);
            navigate(`../campaigns/${campaignId}/campaign-mailing-list`)
        })
    }

    function updateKeyByValue(keyForNewValue, newValue){
        let campaignInfoCopy = JSON.parse(JSON.stringify(campaignInfo));
        campaignInfoCopy[keyForNewValue] = newValue;
        console.log(campaignInfoCopy);
        setCampaignInfo(campaignInfoCopy);
    }
}