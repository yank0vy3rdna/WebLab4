import React from 'react';
import {Button} from "primereact/button";
import store from "../../storage/store";
import {Messages} from "primereact/messages";
import {InputNumber} from "primereact/inputnumber";

function logoutHandler() {
    localStorage.clear()
    store.dispatch({type: "CHANGE_TOKEN", value: {token: null}})
}

function Logout() {
    return (<div className="p-align-center p-fluid">
            <div className="p-field p-grid p-jc-end">
                <div className="p-sm-12 p-md-6 p-xl-3">
                    <Button type="button" onClick={logoutHandler} className="p-button-primary" label="Logout"/>
                </div>
            </div>
    </div>)

}

export default Logout;