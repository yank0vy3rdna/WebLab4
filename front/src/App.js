import React from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import './overrides.scss';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import {Panel} from "primereact/panel";

const Home = () => (
    <HomePage/>
);

const Login = () => (
    <LoginPage/>
);


function App() {
    return (
        <div className="p-grid p-justify-center">
            <Router>
                <div className="p-sm-12 p-md-8 p-xl-5">
                    <Panel className="" header="Web Lab 4. Developed by Kryukov Andrey, P3214, 2523">
                        <Route path="" component={localStorage.getItem("ACCESS_TOKEN") !== null ? Home : Login}/>
                    </Panel>
                </div>
            </Router>
        </div>
    );
}

export default App;
