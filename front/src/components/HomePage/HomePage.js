import React, {useEffect, useRef, useState} from 'react';
import Logout from "./Logout";
import store from "../../storage/store";
import Plot from "./Plot";
import Form from "./Form";
import Table from "./Table";

function HomePage() {
    const MessagesInstance = useRef()
    const [entries, setEntries] = useState(null)
    const [x_val, setX] = useState('0');
    const [y_val, setY] = useState('0');
    const [r_val, setR] = useState('1');
    function validate_number(str, min, max) {
        let n = parseFloat(str);
        return (!isNaN(n) && n >= min && n <= max);
    }
    function validate_all(){
        const validation_result = !validate_number(x_val, -2, 2) || !validate_number(y_val, -3, 3) ||!validate_number(r_val, 0.0001, 3)
        if (validation_result){
            if (MessagesInstance.current !== null) {
                MessagesInstance.current.show({
                    severity: 'warn',
                    summary: 'Validation error'
                })
            }
        }
        return validation_result
    }
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
            <Plot validateNumber={validate_number} MessagesInstance={MessagesInstance}  x={x_val} y={y_val} r={r_val} entries={entries} setEntries={setEntries}/>
            <Form validateAll={validate_all} validateNumber={validate_number} MessagesInstance={MessagesInstance} x_val={x_val} y_val={y_val} r_val={r_val} setX={setX} setY={setY} setR={setR} setEntries={setEntries} entries={entries}/>
            <Table entries={entries}/>
        </div>
    );
}

export default HomePage;