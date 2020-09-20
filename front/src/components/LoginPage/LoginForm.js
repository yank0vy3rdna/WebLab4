import React, {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {Password} from 'primereact/password';
import store from '../../storage/store'
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.css';
import './LoginForm.css';
import {Messages} from "primereact/messages";

let MessagesInstance
const RegisterSuccess = {
    severity: 'success',
    summary: "You've registered"
}
const RegisterUserExists = {
    severity: 'error',
    summary: 'This username is busy'
}
const Error = {
    severity: 'error',
    summary: 'Unhandled error'
}

function LoginForm() {
    const onRegister = (e) => {
        const details = {
            'username': username,
            'password': password,
        };
        console.log(details)
        let formBody = [];
        for (const property in details) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = '?' + formBody.join("&");
        fetch("/auth/register" + formBody, {
            method: 'POST',
        }).then(response => response.text().then(text => {
            if (response.ok) {
                MessagesInstance.show(RegisterSuccess)
            } else if (response.status === 403) {
                MessagesInstance.show(RegisterUserExists)
            } else {
                MessagesInstance.show(Error)
            }
        }))
    }
    const onLogin = (e) => {
        const details = {
            'username': username,
            'password': password,
        };
        console.log(details)
        let formBody = [];
        for (const property in details) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = '?' + formBody.join("&");
        fetch("/auth/login" + formBody, {
            method: 'POST',
        }).then(response => response.text().then(text => {
                if (response.ok) {
                    store.dispatch({type: "CHANGE_TOKEN", value: text})
                } else if (response.status === 403) {
                    MessagesInstance.show({
                        severity: 'error',
                        summary: text
                    })
                } else {
                    MessagesInstance.show(Error)
                }
            })
        )
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="p-align-center p-fluid">
            <form>
                <h3 style={{"text-align": "right"}}>Sign In</h3>
                <Messages ref={(el) => MessagesInstance = el}/>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-2 p-md-4 p-xl-6">Username</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="password" className="p-sm-2 p-md-4 p-xl-6">Password</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">

                    <div className="p-sm-12 p-md-6 p-xl-3">
                        <Button type="button" onClick={onLogin} className="p-button-primary" label="Sign in" icon="pi"/>
                    </div>

                    <div className="p-sm-12 p-md-6 p-xl-3">
                        <Button type="button" onClick={onRegister} className="p-button-primary"
                                label="Register" icon="pi"/>
                    </div>
                </div>
            </form>
        </div>
    );
}


export default LoginForm;