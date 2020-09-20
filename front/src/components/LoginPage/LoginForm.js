import React from 'react';
// import '../signup/Signup.css';
// import {User} from "../../models/User";
// import {LoginService} from "../../services/LoginService";
// import {setSession, removeSession} from "../../common/Session";
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {Password} from 'primereact/password';

import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.css';
import './LoginForm.css';

// var loginService = new LoginService();

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: ''
        };

        // const {close} = this.props.match.params;
        //
        // if (close === "close") {
        // removeSession();
        // }
    }

    componentDidMount() {
        // this.refs.username.focus();
    }

    onSubmit(event) {
        event.preventDefault();
        // var user = new User();
        // user.username = this.state.username;
        // user.password = this.state.password;

        // if (user.username !== "" && user.password !== "") {

        // loginService.getRequest(LoginService.host + LoginService.auth + LoginService.login + "?username=" + user.username + "&password=" + user.password)
        //     .then(response => {
        //         this.refs.form.reset();
        //         debugger;
        //         if (response.data !== null && response.data !== "") {
        //             setSession(response.data);
        //             this.props.history.push("/");
        //         } else {
        //             alert("Please confirm your account before login!");
        //         }
        //     }).catch(error => {
        //     console.log(error.response);
        //     alert("Username or password is wrong!");
        // });
        // } else {
        //     alert("Please insert all needed values!");
        // }
    }

    render() {
        return (
            <div className="p-align-center p-fluid">
                <form ref="form" onSubmit={this.onSubmit}>
                    <h3 style={{"text-align": "right"}}>Sign In</h3>
                    <div className="p-field p-grid p-jc-end">
                        <label htmlFor="username" className="p-sm-2 p-md-4 p-xl-6">Username</label>
                        <div className="p-sm-12 p-md-7 p-xl-5">
                            <InputText id="username" value={this.state.username}
                                       onChange={(e) => this.setState({username: e.target.value})}/>
                        </div>
                    </div>
                    <div className="p-field p-grid p-jc-end">
                        <label htmlFor="password" className="p-sm-2 p-md-4 p-xl-6">Password</label>
                        <div className="p-sm-12 p-md-7 p-xl-5">
                            <Password id="password" value={this.state.password}
                                      onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                    </div>
                    <div className="p-field p-grid p-jc-end">

                        <div className="p-sm-12 p-md-6 p-xl-3">
                        <Button type="button" className="p-button-primary" label="Sign in" icon="pi pi-sign-in"/>
                        </div>

                        <div className="p-sm-12 p-md-6 p-xl-3">
                        <Button type="button" className="p-button-primary" label="Register" icon="pi pi-sign-in"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm;