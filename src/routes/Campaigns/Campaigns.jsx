import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopMenu from "../../components/TopMenu"
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import axios from 'axios';
import createCampaignImage from '../../imgs/create_campaign_card_image.png';
import savedCampaignImage from '../../imgs/saved_campaign_card_image.png';
import '../../styles/themeColors.css';

export default function Campaigns(){

    let navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState("");

    const auth = getAuth();
    
    //Using useEffect prevents state being updated by get requests infinitely.
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUid(user.uid);
                setIsLoggedIn(true);
                getCampaigns()
            } else {
                setIsLoggedIn(false);
            }
        })
    }
    , [isLoggedIn]);

    let campaignsElement = campaigns.map((campaign, index) => 
        <Card style={{width: '18rem'}} key={`saved-card-${index}`}>
            <Card.Img variant="top" src={savedCampaignImage} />
            <Card.Body>
                <Card.Title>{campaign.title}</Card.Title>
                <Card.Text>
                    <br/>
                    Shape Max Size: {campaign.shape_max_size}
                    <br/>
                    Radius Max: {campaign.radius_maximum}
                    <br/>
                    Score Criteria: {campaign.score_type}
                </Card.Text>
                    <Button variant='btn-accent' onClick={() => navigateToCampaignConfigPage(campaign.campaign_id)}>Reconfigure Campaign</Button>                        
            </Card.Body>
        </Card>
    );

    return(
        <div>

            <style type="text/css">
                {`
                    .btn-create {
                        background-color: #FF784F;
                        color: #02020B;
                    }

                    .btn-modify {
                        background-color: #0496FF;
                        color: #02020B;
                    }
                `}

            </style>

            <TopMenu />
            <br/>
            <div className="container">
                <Card style={{ width: '18rem'}}>
                    <Card.Img variant="top" src={createCampaignImage} />
                    <Card.Body>
                        <Card.Title>Create A New Campaign</Card.Title>
                        <Card.Text> Click here to start a new campaign! </Card.Text>
                        <Button variant="create" onClick={() => requestNewId()}>Get Started</Button>                        
                    </Card.Body>
                </Card>
                
                {
                    campaigns.map((campaign, index) => 
                        <Card style={{width: '18rem'}} key={`saved-card-${index}`}>
                            <Card.Img variant="top" src={savedCampaignImage} />
                            <Card.Body>
                                <Card.Title>{campaign.title}</Card.Title>
                                <Card.Text>
                                    <br/>
                                    Shape Max Size: {campaign.shape_max_size}
                                    <br/>
                                    Radius Max: {campaign.radius_maximum}
                                    <br/>
                                    Score Criteria: {campaign.score_type}
                                </Card.Text>
                                <Button variant='modify' onClick={() => navigateToCampaignConfigPage(campaign.campaign_id)}>Reconfigure Campaign</Button>                        
                            </Card.Body>
                        </Card>
                    )
                }

            </div>
        </div>
    )

    function requestNewId(){      
        axios.get('http://localhost:3000/generate-available-campaign-id', { params: {"campaignOwner": uid }})
            .then(function (response) {
            console.log(`We've requested a new id for ${uid}. It was: ${response.data.uniqueId}`)
            navigate(`${response.data.uniqueId}/campaign-config`);
        })
    }

    function navigateToCampaignConfigPage(campaignId){
        navigate(`${campaignId}/campaign-config`);
    }

    function getCampaigns(){
        console.log("Getting all campaigns for: ", uid)  
        axios.get('http://localhost:3000/get-all-campaigns', { params: {"campaignOwner": uid }})
            .then(function (response) {
                setCampaigns(response.data);
            })
    }
}