import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

import TopMenu from '../../../components/TopMenu';
import PresetMenu from './PresetMenu';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




export default function CampaignConfigGenerator(){

    const { campaignId } = useParams();

    const [campaignInfo, setCampaignInfo] = useState({
        'title': '',
        'description': '',
        'test_length': 3,
        'shape_max_size': 1,
        'plus_modifier_amount': 1,
        'times_modifier_amount': 1,
        'power_modifier_amount': 1,
        'undefined_modifier_amount': 1,
        'radius_maximum': 1,
        'score_type': 'max'        
    });

    let navigate = useNavigate();
    useEffect(() => loadSpecificConfig(), []);

    function loadSpecificConfig() {
        axios.post('http://localhost:3000/get-config', { campaignId: campaignId })
            .then(function(response) {
                const data = response.data;

                if(data !== ''){
                    setCampaignInfo({
                        'title': data.title,
                        'description': data.description,
                        'test_length': data.test_length,
                        'shape_max_size': data.shape_max_size,
                        'plus_modifier_amount': data.plus_modifier_amount,
                        'times_modifier_amount': data.times_modifier_amount,
                        'power_modifier_amount': data.power_modifier_amount,
                        'undefined_modifier_amount': data.undefined_modifier_amount,
                        'radius_maximum': data.radius_maximum,
                        'score_type':data.score_type
                    })
                }
            })
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

    return(
        <>
            <TopMenu/>
            <h2>Campaign Configuration</h2>
            <br/>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Campaign Title</Form.Label>
                    <Form.Control type="email" placeholder="2017 Campaign For New Hires" />
                    <Form.Text className="text-muted">
                        Try something punchy that you'll remember!
                    </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
            <br/>
            <h3>Suggested Presets</h3>
            <PresetMenu update={updateKeyByValue}/>

        </>
    )
}