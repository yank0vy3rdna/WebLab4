import React, {useEffect, useState} from 'react';
import Logout from "./Logout";
import store from "../../storage/store";
import Plot from "./Plot";
import Form from "./Form";
import Table from "./Table";

function HomePage() {
    const [entries, setEntries] = useState(null)
    useEffect(() => {
        if (entries === null) {
            fetch("/entry?token=" + store.getState().token)
                .then(
                    response => {
                        if (response.status === 403){
                            localStorage.clear()
                            store.dispatch({type: "CHANGE_TOKEN", value: {token: null}})
                            return
                        }
                        response.text()
                            .then(
                                text => {
                                    console.log(JSON.parse(text), text)
                                    setEntries(JSON.parse(text).reverse())
                                }
                            )
                    }
                )
        }
    }, [])
    return (
        <div>
            <Logout/>
            <Plot/>
            <Form setEntries={setEntries}/>
            <Table entries={entries}/>
        </div>
    );
}

export default HomePage;