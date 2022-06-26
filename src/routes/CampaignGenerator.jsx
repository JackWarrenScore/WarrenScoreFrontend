import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from "../components/TopMenu"
import ToggleButtons from '../components/ToggleButtons';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios from 'axios';
import Constants from '../Constants';

export default function CampaignGenerator(){

    const rolePresetData = [
        {'name': 'Custom', 'value':'1', 'variant': "secondary", 'variantOutline': "outline-secondary", 
            dataToBeModified: {
                ALLOW_SHAPES: false, 
                SHAPE_MAX: 0,
                PLUS_MODIFIER:0,
                TIMES_MODIFIER:0,
                POWER_MODIFIER:0,
                UNDEFINED_MODIFIER:0
            }    
        },
        {'name': 'Manager', 'value':'2', 'variant': "success", 'variantOutline': "outline-success",
            dataToBeModified: {
                ALLOW_SHAPES: false, 
                SHAPE_MAX: 0,
                PLUS_MODIFIER:1,
                TIMES_MODIFIER:1,
                POWER_MODIFIER:0,
                UNDEFINED_MODIFIER:2
            }
        },
        {'name': 'Analyst', 'value':'3', 'variant': "warning", 'variantOutline': "outline-warning",
            dataToBeModified: {
                ALLOW_SHAPES: false, 
                SHAPE_MAX: 0,
                PLUS_MODIFIER:1,
                TIMES_MODIFIER:2,
                POWER_MODIFIER:0,
                UNDEFINED_MODIFIER:0
            }
        },
        {'name': 'Developer', 'value':'4', 'variant': "danger", 'variantOutline': "outline-danger",
            dataToBeModified: {
                ALLOW_SHAPES: true, 
                SHAPE_MAX: 3,
                PLUS_MODIFIER:0,
                TIMES_MODIFIER:1,
                POWER_MODIFIER:2,
                UNDEFINED_MODIFIER:1
            }
        },
        {'name': 'Architect', 'value':'5', 'variant': "info", 'variantOutline': "outline-info",
            dataToBeModified: {
                ALLOW_SHAPES: true, 
                SHAPE_MAX: 5,
                PLUS_MODIFIER:1,
                TIMES_MODIFIER:2,
                POWER_MODIFIER:3,
                UNDEFINED_MODIFIER:0
            }
        }
    ]

    const [campaignInfo, setCampaignInfo] = useState({
        TITLE:"A pretty sick title.",
        DESCRIPTION:"A really rad description",
        ALLOW_SHAPES:false,
        SHAPE_MAX:0,
        PLUS_MODIFIER:0,
        TIMES_MODIFIER:0,
        POWER_MODIFIER:0,
        UNDEFINED_MODIFIER:0
    });

    function testConnection() {
        axios.post('http://localhost:3000/campaigns/create')
        .then(response => console.log(response));
    }

    function showMeTheState() {
        console.log(campaignInfo);
    }

    function updateState(keyForNewValue, newValue){
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
                    onChange={(e) => updateState("TITLE", e.target.value)}></input>
                <br/>
                <ToggleButtons currentState={campaignInfo} updateState={setCampaignInfo} controls={rolePresetData}/>
            </div>
            <br/>


            <Button variant="primary" onClick={() => showMeTheState()}>Save And Continue</Button>
        </div>
    )
}