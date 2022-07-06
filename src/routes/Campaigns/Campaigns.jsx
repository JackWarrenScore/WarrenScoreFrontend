import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopMenu from "../../components/TopMenu"
import {LinkContainer} from 'react-router-bootstrap'
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';
import createCampaignImage from '../../imgs/create_campaign_card_image.png';

export default function Campaigns(){

    let navigate = useNavigate();

    function requestNewId(){
        
        axios.get('http://localhost:3000/generateAvailableCampaignId')
            .then(function (response) {
            navigate(`${response.data.uniqueId}/campaign-config`);
        })
    }

    function goToCampaignConfigGenerator(configId){

    }

    return(
        <div>
            <TopMenu />
            <div>
                <Card style={{ width: '18rem'}}>
                    <Card.Img variant="top" src={createCampaignImage} />
                    <Card.Body>
                        <Card.Title>Create A New Campaign</Card.Title>
                        <Card.Text>
                            Click here to start a new campaign!
                        </Card.Text>
                        {/* <LinkContainer to={"${uniqueCampaignId}/campaign-config"}> */}
                            <Button variant="primary" onClick={() => requestNewId()}>Get Started</Button>
                        {/* </LinkContainer> */}
                        
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}