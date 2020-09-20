import React, {useEffect} from 'react';
import Logout from "./Logout";
import store from "../../storage/store";
import Plot from "./Plot";
import Form from "./Form";

function HomePage() {
    return (
        <div>
            <Logout/>
            <Plot/>
            <Form/>
        </div>
    );
}

export default HomePage;