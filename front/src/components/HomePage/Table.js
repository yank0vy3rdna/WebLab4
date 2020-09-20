import React from "react"
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

function Table(props) {
    return <DataTable value={props.entries} >
        <Column field="x" header="X"/>
        <Column field="y" header="Y"/>
        <Column field="r" header="R"/>
        <Column field="result" header="Res"/>
        <Column field="timestamp" header="Timestamp"/>
    </DataTable>
}

export default Table;