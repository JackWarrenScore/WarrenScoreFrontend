import TopMenu from "../components/TopMenu"
import React, { useState, useEffect } from 'react';

import { getAuth, EmailAuthProvider, onAuthStateChanged } from "firebase/auth";
import 'firebaseui/dist/firebaseui.css'
import firebaseConfigApp from './firebase-config.js'

var firebaseui = require('firebaseui');

const auth = getAuth(firebaseConfigApp);
var ui = new firebaseui.auth.AuthUI(auth);


export default function Authentication(){

    const [testData, setTestData] = useState([]);
    
    useEffect(() => {
        ui.start('#firebaseui-auth-container', {
            signInSuccessUrl: '../',
            signInOptions: [
                {
                    provider: EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                }
            ],
            callbacks: {
                
            }
          });
        
      }, []);

    return(
        <>
            <TopMenu />
            <div id="firebaseui-auth-container"></div>  
        </>
    )
}