import React, {useState} from "react"
import {InputText} from "primereact/inputtext";
import {Messages} from "primereact/messages";
import store from "../../storage/store";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";

let MessagesInstance

function Form(props) {
    const [x_val, setX] = useState(0);
    const [y_val, setY] = useState(0);
    const [r_val, setR] = useState(0);
    const options = [
        {label: "-2", value: "-2"},
        {label: "-1.5", value: "-1.5"},
        {label: "-1", value: "-1"},
        {label: "-0.5", value: "-0.5"},
        {label: "0", value: "0"},
        {label: "0.5", value: "0.5"},
        {label: "1", value: "1"},
        {label: "1.5", value: "1.5"},
        {label: "2", value: "2"},
    ]
    const onSubmit = () => {
        fetch("/entry?token=" + store.getState().token + "&x=" + x_val + "&y=" + y_val + "&r=" + r_val, {
            method: 'POST'
        }).then(response => response.text()
            .then(text => props.setEntries(JSON.parse(text).reverse())))
    }
    return <div>
        <div className="p-align-center p-fluid">
            <form>

                <Messages ref={(el) => MessagesInstance = el}/>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-2 p-md-4 p-xl-6">X</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <Dropdown value={x_val} options={options} onChange={(e) => {
                            setX(e.value)
                        }} placeholder="Select X"/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-2 p-md-4 p-xl-6">Y(-3 .. 3)</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <InputNumber value={y_val} onValueChange={(e) => setY(e.value)} mode="decimal" min={-3} max={3}
                                     minFractionDigits={1} maxFractionDigits={7} placeholder="Enter Y(-3 .. 3)"/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-2 p-md-4 p-xl-6">R</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <Dropdown value={r_val} options={options} onChange={(e) => {
                            setR(e.value)
                        }} placeholder="Select R"/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">
                    <div className="p-sm-12 p-md-6 p-xl-3">
                        <Button type="button" onClick={onSubmit} className="p-button-primary" label="Submit" icon="pi"/>
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default Form;