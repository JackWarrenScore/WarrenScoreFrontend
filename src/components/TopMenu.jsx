import { Link, Outlet} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../styles/themeColors.css';

export default function TopMenu(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState("");
    const [userName, setUserName] = useState("");

    const auth = getAuth();



    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if(user){
                setIsLoggedIn(true);
                setUid(user.uid);
                setUserName(user.displayName)
                console.log(isLoggedIn, uid, userName);
            } else {
                setIsLoggedIn(false);
            }
        })
    }, [isLoggedIn]);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setAuthUser(user);
    //             console.log(authUser)
    //         } else {
    //             // User is signed out
    //             // ...
    //         }
    //         });
    //   }, []);

    return(
        <div>
                <Navbar className="primary" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand> Warren Score </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link variant="danger">Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/demo">
                            <Nav.Link>Demo</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/campaigns">
                            <Nav.Link>Campaigns</Nav.Link>
                        </LinkContainer>
                        {isLoggedIn !== true
                            ? <LinkContainer to="/authentication"><Nav.Link>Sign in</Nav.Link></LinkContainer>
                            : <LinkContainer to="/userProfile"><Nav.Link>{userName}</Nav.Link></LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </div>

    )
}