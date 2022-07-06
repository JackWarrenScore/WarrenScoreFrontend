import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Demo from "./routes/Demo";
import Campaigns from "./routes/Campaigns/Campaigns";
import CampaignConfigGenerator from './routes/Campaigns/CampaignConfigGenerator';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route exact path="/" element={ <App />} />
        <Route exact path="demo" element={ <Demo />} />
        <Route exact path="campaigns" element={<Campaigns />} />
        <Route exact path="campaigns/:campaignId/campaign-config" element={<CampaignConfigGenerator/> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
