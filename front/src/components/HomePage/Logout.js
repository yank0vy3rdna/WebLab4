import React from 'react';
import {Button} from "primereact/button";
import store from "../../storage/store";

function logoutHandler() {
    localStorage.clear()
    store.dispatch({type: "CHANGE_TOKEN", value: {token: null}})
    window.location.reload();
}

function Logout() {
    return (<Button type="button" onClick={logoutHandler} className="p-button-primary" label="Logout"/>)

}

export default Logout;