import React, {useEffect, useState} from 'react';
import Logout from "./Logout";
import store from "../../storage/store";
import Plot from "./Plot";
import Form from "./Form";
import Table from "./Table";

function HomePage() {
    const [entries, setEntries] = useState(null)
    const [x_val, setX] = useState('0');
    const [y_val, setY] = useState('0');
    const [r_val, setR] = useState('1');
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
            <Plot x={x_val} y={y_val} r={r_val} entries={entries}/>
            <Form x_val={x_val} y_val={y_val} r_val={r_val} setX={setX} setY={setY} setR={setR} setEntries={setEntries} entries={entries}/>
            <Table entries={entries}/>
        </div>
    );
}

export default HomePage;