import store from "../../storage/store";

function canvas_arrow(context, fromx, fromy, tox, toy) {
    const headlen = 10; // length of head in pixels
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);

    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function draw_coordinates(ctx, r) {
    let R = ctx.canvas.height / 4
    let R_text;
    try {
        R_text = parseFloat(r)
    } catch (e) {
        R_text = 1
    }
    if (isNaN(R_text)) {
        R_text = 1
    }
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    //Вертикальные черты
    ctx.fillText(-R_text / 2, Math.round((ctx.canvas.width / 2.05 + ctx.canvas.width / 40)), Math.round(ctx.canvas.height / 2 + R / 2 + 2))
    ctx.fillText(-R_text, Math.round(ctx.canvas.width / 2.05 + ctx.canvas.width / 40), Math.round(ctx.canvas.height / 2 + R + 2))
    ctx.fillText(R_text / 2, Math.round(ctx.canvas.width / 2.05 + ctx.canvas.width / 40), Math.round(ctx.canvas.height / 2 - R / 2 + 2))
    ctx.fillText(R_text, Math.round(ctx.canvas.width / 2.05 + ctx.canvas.width / 40), Math.round(ctx.canvas.height / 2 - R + 2))
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 + R / 2)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 + R / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 + R)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 + R)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 - R / 2)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 - R / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 - R)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 - R)
    ctx.stroke()
    // Горизонтальные черты
    ctx.fillText(-R_text / 2, Math.round(ctx.canvas.width / 2 - R / 2 - 6), Math.round(ctx.canvas.height / 2.2))
    ctx.fillText(-R_text, Math.round(ctx.canvas.width / 2 - R - 3), Math.round(ctx.canvas.height / 2.2))
    ctx.fillText(R_text / 2, Math.round(ctx.canvas.width / 2 + R / 2 - 6), Math.round(ctx.canvas.height / 2.2))
    ctx.fillText(R_text, Math.round(ctx.canvas.width / 2 + R - 3), Math.round(ctx.canvas.height / 2.2))
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 - R / 2, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 - R / 2, ctx.canvas.height / 1.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 - R, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 - R, ctx.canvas.height / 1.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 1.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 + R, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 + R, ctx.canvas.height / 1.9)
    ctx.stroke()
    // Стрелки

    canvas_arrow(ctx, ctx.canvas.width * 0.1, ctx.canvas.height / 2, ctx.canvas.width * 0.9, ctx.canvas.height / 2)
    ctx.fillText('X', ctx.canvas.width * 0.9, ctx.canvas.height / 2.1)
    canvas_arrow(ctx, ctx.canvas.width / 2, ctx.canvas.height * 0.9, ctx.canvas.width / 2, ctx.canvas.height * 0.1)
    ctx.fillText('Y', ctx.canvas.width / 2.2, ctx.canvas.height * 0.1)
}

function draw(ctx, x, y, r, entries) {
    if (entries===null){
        entries = []
    }

    if (ctx) {
        ctx.canvas.width = ctx.canvas.offsetWidth
        ctx.canvas.height = ctx.canvas.offsetHeight

        let R = ctx.canvas.height / 4
        ctx.font = Math.round(ctx.canvas.width / 50) + 'px verdana';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        // Сектор

        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, R, 0, Math.PI / 2, false);
        ctx.closePath();
        ctx.strokeStyle = "rgba(91,95,201,0.58)";
        ctx.fillStyle = "rgba(91,95,201,0.58)";
        ctx.fill();
        ctx.stroke();

        // Прямоугольник

        ctx.fillRect(ctx.canvas.width / 2 - R / 2, ctx.canvas.height / 2 - R, R / 2, R)

        // Треугольник

        ctx.beginPath()
        ctx.moveTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 2)
        ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - R)
        ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2)
        ctx.lineTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Рисуем координатные оси

        draw_coordinates(ctx, r)
        drawPoints(ctx, entries, r)
        drawPoint(ctx, parseFloat(x), parseFloat(y), r, 1)
    } else {
        alert("You're using too old browser")
    }
}

function drawPoint(ctx, x, y, r, alpha) {
    let r_val
    try {
        r_val = parseFloat(r)
    } catch (e) {
        r_val = 1
    }
    if (isNaN(r_val)) {
        r_val = 1
    }
    let R = ctx.canvas.height / 4 / r_val

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y);
    ctx.arc(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y, ctx.canvas.width / 300, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgba(255, 0, 0, " + alpha + ")";
    ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
    ctx.fill();
    ctx.stroke();
}

function drawPoints(ctx, entries, r) {
    const myRows = entries
    if (myRows.length === 0)
        return
    const alphastep = myRows.length <= 5 ? 1. / (myRows.length) : 0.2
    let r_val
    try {
        r_val = parseFloat(r)
    } catch (e) {
        r_val = 1
        console.error(e)
    }
    if (isNaN(r_val)) {
        r_val = 1
    }
    let R = ctx.canvas.height / 4 / r_val
    for (let i = 0; i < myRows.length; i++) {
        const x = myRows[i]['x'],
            y = myRows[i]['y'];
        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y);
        ctx.arc(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y, ctx.canvas.width / 300, 0, 2 * Math.PI);
        ctx.closePath();
        if (myRows[i]['result'] === 'true') {
            ctx.strokeStyle = "rgba(0, 255, 0, " + (1. - alphastep * i) + ")";
            ctx.fillStyle = "rgba(0, 255, 0, " + (1. - alphastep * i) + ")";
        } else {
            ctx.strokeStyle = "rgba(255, 0, 0, " + (1. - alphastep * i) + ")";
            ctx.fillStyle = "rgba(255, 0, 0, " + (1. - alphastep * i) + ")";
        }
        ctx.fill();
        ctx.stroke();
    }
}

function canvas_click_handler(event, r, setEntries, validateNumber, ctx, MessagesInstance) {
    try {
        let r_val = parseFloat(r)
        if (isNaN(r_val)) {
            r_val = 1
        }
        let kR = r_val / (ctx.canvas.height / 4)
        const x = event.nativeEvent.offsetX,
            y = event.nativeEvent.offsetY;
        const rly_x = (x - ctx.canvas.width / 2) * kR;
        let rly_y = (ctx.canvas.height / 2 - y) * kR;
        const x_val = rly_x.toFixed(10).toString()
        const y_val = rly_y.toFixed(10).toString()
        r_val = r_val.toFixed(10).toString()
        if (!validateNumber(x_val, -2, 2) || !validateNumber(y_val, -3, 3) ||!validateNumber(r_val, 0.0001, 3)){
            if (MessagesInstance.current !== null) {
                MessagesInstance.current.show({
                    severity: 'warn',
                    summary: 'Validation error'
                })
            }
        }
        else {
            fetch("/entry?token=" + store.getState().token + "&x=" + x_val + "&y=" + y_val + "&r=" + r_val, {
                method: 'POST'
            }).then(response => response.text()
                .then(text => setEntries(JSON.parse(text).reverse())))
        }
    } catch (e) {
        console.log(e)
    }
}

export {draw, drawPoint, canvas_click_handler}