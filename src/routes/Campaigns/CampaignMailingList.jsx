import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { InputGroup, Col, ListGroup, Row, Tab, Form, Button } from 'react-bootstrap';

import { useParams, useNavigate } from "react-router-dom";

import TopMenu from '../../components/TopMenu';

import axios from 'axios';

import React, { useState, useEffect } from 'react';

export default function CampaignMailingList(){
    
    const [mailingList, setMailingList] = useState(new Set())
    const [email, setEmail] = useState("")

    const { campaignId } = useParams();
    let navigate = useNavigate();

    useEffect(() => loadSpecificMailingList(), []);

    let emailsAsAList = <ListGroup> {[...mailingList].map((item, i) => <ListGroup.Item key={`${item}-element`}>{item}</ListGroup.Item>)} </ListGroup>
    
    
    return (
        <div>
            <TopMenu/>
            <h1>Next: Who are your applicants?</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Applicant Email"
                    aria-label="Applicant Email"
                    aria-describedby="basic-addon2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={() => addToMailingList(email)}> Add Participant </Button>
            </InputGroup>

                {emailsAsAList}

            <Button onClick={() => saveAndNavigateToCampaigns()}>Finish!</Button>
            
        </div>
    );

    function addToMailingList(element){
        if(element !== ""){
            let mailingListCopy = new Set(mailingList);
            mailingListCopy.add(element)
            console.log(mailingListCopy, email)
            setMailingList(mailingListCopy);
            setEmail("")
        }
    }

    function loadSpecificMailingList(){
        axios.post('http://localhost:3000/get-mailing-list', {campaignId: campaignId})
            .then(function (response){
                console.log(response);
                if(response.data !== []){
                    let retrievedMailingList = new Set();
                    for(const index in response.data){
                        retrievedMailingList.add(response.data[index].email)
                    }
                    setMailingList(retrievedMailingList)
                }
            })
    }

    //TODO: Probably not the best flow to be generating the aptitest in the mailing list.
    //Reimplement to make more sense down the line.
    function saveAndNavigateToCampaigns(){
        axios.post('http://localhost:3000/upsert-campaign-mailing-list', 
            {
                campaignId: campaignId,
                campaignRecipients: [...mailingList]
            }
        )
        .then(function (response){
            console.log(response);

            axios.post('http://localhost:3000/upsert-aptitest-key', {campaignId: campaignId})
            .then(function (response){
                navigate(`../campaigns`)
            })
        })
    }
}