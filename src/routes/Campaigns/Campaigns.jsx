import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopMenu from "../../components/TopMenu"
import {LinkContainer} from 'react-router-bootstrap'
import React, { useState } from 'react';
import axios from 'axios';
import createCampaignImage from '../../imgs/create_campaign_card_image.png';

export default function Campaigns(){

    const [uniqueCampaignId, setUniqueCampaignId] = useState(-1);

    function getNewCampaignId(){
        axios.get('/generateAvailableCampaignId')
            .then(function (response) {
            // handle success
            console.log(response);
            return 8675309;
        })
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
                        <LinkContainer to={{pathname: getNewCampaignId()}}>
                            <Button variant="primary">Get Started</Button>
                        </LinkContainer>
                        
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}