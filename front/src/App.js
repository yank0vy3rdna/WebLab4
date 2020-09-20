import React, {useState} from 'react';

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
const timer = () => {
    fetch('/getTime').then(response => response.text().then((text) => {
        setTimeApp(text);
        setTimeout(timer, 1000)
    }))
}
let setTimeApp
timer()
function App() {
    const [time, setTime] = useState("")
    setTimeApp = setTime
    return (
        <div className="p-grid p-justify-center">
            <Router>
                <div className="p-sm-12 p-md-8 p-xl-5">
                    <Panel className="" header={"Web Lab 4. Developed by Kryukov Andrey, P3214, V2523, " + time}>
                        <Route path="" component={localStorage.getItem("ACCESS_TOKEN") !== null ? Home : Login}/>
                    </Panel>
                </div>
            </Router>
        </div>
    );
}

export default App;
