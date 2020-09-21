import React, {useEffect, useRef} from "react"
import {canvas_click_handler, draw} from "./drawing_methods"

function Plot(props) {
    const canvas = useRef()
    useEffect(() => {
        draw(canvas.current.getContext("2d"), props.x, props.y, props.r, props.entries)
    }, [draw, props])
    return <div>
        <canvas ref={canvas} onClick={(e) => {
            canvas_click_handler(e, props.r, props.setEntries, props.validateNumber, canvas.current.getContext("2d"), props.MessagesInstance)
        }} style={{width: "100%", height: "40vh"}}/>
    </div>
}

export default Plot;