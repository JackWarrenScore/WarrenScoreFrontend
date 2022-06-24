import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from "../components/TopMenu"
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import axios from 'axios';

export default function CampaignGenerator(){

    function testConnection() {
        axios.get('http://localhost:3000')
        .then(response => console.log(response));
    }

    return (
        <div>
            <TopMenu />
            <h1>Why are huntington commercials stupid?</h1>
            <Button variant="primary" onClick={testConnection}>Save And Continue</Button>
        </div>
    )
}