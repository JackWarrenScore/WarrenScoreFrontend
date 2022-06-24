import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TopMenu from "../components/TopMenu"
import {LinkContainer} from 'react-router-bootstrap'

import createCampaignImage from '../imgs/create_campaign_card_image.png';

export default function Campaigns(){
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
                        <LinkContainer to="create">
                            <Button variant="primary">Get Started</Button>
                        </LinkContainer>
                        
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}