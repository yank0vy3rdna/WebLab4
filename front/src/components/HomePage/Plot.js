import React, {useEffect, useRef} from "react"
import {draw} from "./drawing_methods"
import {x, y, r} from "./Form"

function Plot(props) {
    const canvas = useRef()
    useEffect(() => {
        draw(canvas.current.getContext("2d"), x, y, r, props.entries)
    }, [draw, x, y, r, props])
    return <div>
        <canvas ref={canvas} style={{width: "100%", height: "40vh"}}/>
    </div>
}

export default Plot;