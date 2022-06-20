import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export default function TopMenu(){
    return(
        <div>
                <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand> Warren Score </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/demo">
                            <Nav.Link>Demo</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/campaigns">
                            <Nav.Link>Campaigns</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>

    )
}