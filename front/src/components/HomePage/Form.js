import React, {useRef} from "react"
import {Messages} from "primereact/messages";
import store from "../../storage/store";
import {Button} from "primereact/button";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";


export let x, y, r

function Form(props) {
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
        if (props.validateAll()) {
            fetch("/entry?token=" + store.getState().token + "&x=" + props.x_val + "&y=" + props.y_val + "&r=" + props.r_val, {
                method: 'POST'
            }).then(response => response.text()
                .then(text => props.setEntries(JSON.parse(text).reverse())))
        }
    }
    return <div>
        <div className="p-align-center p-fluid">
            <form>

                <Messages ref={(el) => props.MessagesInstance.current = el}/>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-3 p-md-4 p-xl-6">X</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <Dropdown value={props.x_val} options={options} onChange={(e) => {
                            props.setX(e.value)
                        }} placeholder="Select X"/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-3 p-md-4 p-xl-6">Y(-3 .. 3)</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <InputNumber value={props.y_val} onValueChange={(e) => props.setY(e.value)} mode="decimal"
                                     min={-3} max={3}
                                     minFractionDigits={1} maxFractionDigits={7} placeholder="Enter Y(-3 .. 3)"/>
                    </div>
                </div>
                <div className="p-field p-grid p-jc-end">
                    <label htmlFor="username" className="p-sm-3 p-md-4 p-xl-6">R</label>
                    <div className="p-sm-12 p-md-7 p-xl-5">
                        <Dropdown value={props.r_val} options={options} onChange={(e) => {
                            if (!props.validateNumber(e.value, 0.0001, 2)) {
                                props.MessagesInstance.current.show({
                                    severity: 'warn',
                                    summary: 'Validation error: R should be in range (0; 2]'
                                })
                                e.value = props.r_val
                            } else {
                                props.setR(e.value)
                            }
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